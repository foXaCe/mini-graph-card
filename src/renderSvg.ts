import { svg, type SVGTemplateResult } from 'lit';
import { X, Y, V } from './const';
import type { BarData, CardContext, GradientStop } from './types';

// SVG rendering fragments extracted from MiniGraphCard. Each function takes the
// card instance and reads its reactive state (config, line, fill, points,
// gradient, tooltip, entity) plus its computeColor/setTooltip helpers. The
// entry point is renderSvg(card); the rest are module-internal.

type SvgFragment = SVGTemplateResult | undefined;

function renderSvgFill(card: CardContext, fill: string, i: number): SvgFragment {
  if (!fill) return undefined;
  const init = card.length[i] || card.config.entities[i].show_line === false;
  return svg`
    <defs>
      <linearGradient id=${`fill-grad-${card.id}-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop stop-color='white' offset='0%' stop-opacity='1'/>
        <stop stop-color='white' offset='100%' stop-opacity='.15'/>
      </linearGradient>
      <mask id=${`fill-grad-mask-${card.id}-${i}`}>
        <rect width="100%" height="100%" fill=${`url(#fill-grad-${card.id}-${i})`} />
      </mask>
    </defs>
    <mask id=${`fill-${card.id}-${i}`}>
      <path class='fill'
        type=${card.config.show.fill}
        .id=${i} anim=${card.config.animate} ?init=${init}
        style="animation-delay: ${card.config.animate ? `${i * 0.5}s` : '0s'}"
        fill='white'
        mask=""
        d=${card.fill[i]}
      />
    </mask>`;
}

function renderSvgLine(card: CardContext, line: string, i: number): SvgFragment {
  if (!line) return undefined;

  const path = svg`
    <path
      class='line'
      .id=${i}
      anim=${card.config.animate} ?init=${card.length[i]}
      style="animation-delay: ${card.config.animate ? `${i * 0.5}s` : '0s'}"
      fill='none'
      stroke-dasharray=${card.length[i] || 'none'} stroke-dashoffset=${card.length[i] || 'none'}
      stroke=${'white'}
      stroke-width=${card.config.line_width}
      d=${card.line[i]}
    />`;

  return svg`
    <mask id=${`line-${card.id}-${i}`}>
      ${path}
    </mask>
  `;
}

function renderSvgPoint(card: CardContext, point: number[], i: number): SvgFragment {
  const color = card.gradient[i] ? card.computeColor(point[V], i) : 'inherit';
  const onOver = () => card.setTooltip(i, point[3], point[V]);
  const onOut = () => { card.tooltip = {}; };

  return svg`
    <circle
      class='line--point'
      ?inactive=${card.tooltip.index !== point[3]}
      style=${`--mcg-hover: ${color};`}
      stroke=${color}
      fill=${color}
      cx=${point[X]} cy=${point[Y]} r=${card.config.line_width}
      @mouseover=${onOver}
      @mouseout=${onOut}
      data-entity-index=${i}
      data-point-value=${point[V]}
    />
  `;
}

function renderSvgPoints(card: CardContext, points: number[][], i: number): SvgFragment {
  if (!points) return undefined;
  const color = card.computeColor(card.entity[i].state, i);
  return svg`
    <g class='line--points'
      ?tooltip=${card.tooltip.entity === i}
      ?inactive=${card.tooltip.entity !== undefined && card.tooltip.entity !== i}
      ?init=${card.length[i]}
      anim=${card.config.animate && card.config.show.points !== 'hover'}
      style="animation-delay: ${card.config.animate ? `${i * 0.5 + 0.5}s` : '0s'}"
      fill=${color}
      stroke=${color}
      stroke-width=${card.config.line_width / 2}>
      ${points.map((point) => renderSvgPoint(card, point, i))}
    </g>`;
}

function renderSvgGradient(
  card: CardContext,
  gradients: Array<GradientStop[] | undefined>,
): SvgFragment {
  if (!gradients) return undefined;
  const items = gradients.map((gradient, i) => {
    if (!gradient) return undefined;
    return svg`
      <linearGradient id=${`grad-${card.id}-${i}`} gradientTransform="rotate(90)">
        ${gradient.map((stop) => svg`
          <stop stop-color=${stop.color} offset=${`${stop.offset}%`} />
        `)}
      </linearGradient>`;
  });
  return svg`${items}`;
}

function renderSvgLineRect(card: CardContext, line: string, i: number): SvgFragment {
  if (!line) return undefined;
  const fill = card.gradient[i]
    ? `url(#grad-${card.id}-${i})`
    : card.computeColor(card.entity[i].state, i);
  return svg`
    <rect class='line--rect'
      ?inactive=${card.tooltip.entity !== undefined && card.tooltip.entity !== i}
      id=${`rect-${card.id}-${i}`}
      fill=${fill} height="100%" width="100%"
      mask=${`url(#line-${card.id}-${i})`}
    />`;
}

function renderSvgFillRect(card: CardContext, fill: string, i: number): SvgFragment {
  if (!fill) return undefined;
  const svgFill = card.gradient[i]
    ? `url(#grad-${card.id}-${i})`
    : card.computeColor(card.entity[i].state, i);
  return svg`
    <rect class='fill--rect'
      ?inactive=${card.tooltip.entity !== undefined && card.tooltip.entity !== i}
      id=${`fill-rect-${card.id}-${i}`}
      fill=${svgFill} height="100%" width="100%"
      mask=${`url(#fill-${card.id}-${i})`}
    />`;
}

function renderSvgBars(card: CardContext, bars: BarData[], index: number): SvgFragment {
  if (!bars) return undefined;
  const items = bars.map((bar, i) => {
    const animation = card.config.animate
      ? svg`
        <animate attributeName='y' from=${card.config.height} to=${bar.y} dur='1s' fill='remove'
          calcMode='spline' keyTimes='0; 1' keySplines='0.215 0.61 0.355 1'>
        </animate>`
      : '';
    const color = card.computeColor(bar.value, index);
    const onOver = () => card.setTooltip(index, i, bar.value);
    const onOut = () => { card.tooltip = {}; };
    return svg`
      <rect class='bar' x=${bar.x} y=${bar.y}
        height=${bar.height} width=${bar.width} fill=${color}
        @mouseover=${onOver}
        @mouseout=${onOut}>
        ${animation}
      </rect>`;
  });
  return svg`<g class='bars' ?anim=${card.config.animate}>${items}</g>`;
}

export default function renderSvg(card: CardContext): SVGTemplateResult {
  const { height } = card.config;
  return svg`
    <svg width='100%' height='100%' viewBox='0 0 500 ${height}' preserveAspectRatio='none'
      @click=${(e: Event) => e.stopPropagation()}>
      <g>
        <defs>
          ${renderSvgGradient(card, card.gradient)}
        </defs>
        ${card.fill.map((fill, i) => renderSvgFill(card, fill, i))}
        ${card.fill.map((fill, i) => renderSvgFillRect(card, fill, i))}
        ${card.line.map((line, i) => renderSvgLine(card, line, i))}
        ${card.line.map((line, i) => renderSvgLineRect(card, line, i))}
        ${card.bar.map((bars, i) => renderSvgBars(card, bars, i))}
      </g>
      ${card.points.map((points, i) => renderSvgPoints(card, points, i))}
    </svg>`;
}
