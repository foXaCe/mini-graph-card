import { css } from 'lit';

const style = css`
  :host {
    /* ── Premium design tokens ──────────────────────────────────────────────
       Everything derives from the active Home Assistant theme via color-mix in
       oklab, so the card stays coherent in light, dark and exotic themes — no
       hard-coded colours. Users can still override the --mcg-* hooks. */

    /* Radius — Apple-like, rounder than stock Material */
    --p-radius-sm: 10px;
    --p-radius-md: 14px;
    --p-radius-lg: 18px;
    --p-radius-pill: 9999px;

    /* Typography — system stack (SF Pro / Roboto spirit), no web fonts */
    --p-font: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
      'Segoe UI', Roboto, system-ui, sans-serif;

    /* Foreground / surface, derived from HA */
    --p-fg-1: var(--primary-text-color);
    --p-accent: var(--primary-color);
    --p-surface: var(--ha-card-background, var(--card-background-color, #fff));
    --p-divider: color-mix(in oklab, var(--p-fg-1) 12%, transparent);

    /* Multi-layer shadows (Apple-style, never a single hard shadow), tinted by
       the foreground so they read correctly on any background */
    --p-elev-1:
      0 1px 2px color-mix(in oklab, var(--p-fg-1) 7%, transparent),
      0 1px 3px color-mix(in oklab, var(--p-fg-1) 5%, transparent);
    --p-elev-2:
      0 2px 6px color-mix(in oklab, var(--p-fg-1) 9%, transparent),
      0 10px 28px color-mix(in oklab, var(--p-fg-1) 12%, transparent);
    --p-elev-pill:
      0 1px 2px color-mix(in oklab, var(--p-fg-1) 8%, transparent),
      0 2px 6px color-mix(in oklab, var(--p-fg-1) 6%, transparent);
    --p-elev-pressed: inset 0 1px 2px color-mix(in oklab, var(--p-fg-1) 12%, transparent);

    /* Motion — spring physics, never linear/ease */
    --p-ease: cubic-bezier(0.32, 0.72, 0, 1);
    --p-motion-fast: 150ms var(--p-ease);
    --p-motion-normal: 240ms var(--p-ease);

    /* Liquid Glass */
    --p-blur-glass: saturate(180%) blur(16px);
    --p-glass-bg: color-mix(in oklab, var(--p-surface) 72%, transparent);
    --p-glass-border: color-mix(in oklab, var(--p-fg-1) 10%, transparent);

    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    container-type: inline-size;
    font-family: var(--p-font);
  }
  ha-card {
    flex-direction: column;
    flex: 1;
    padding: 0;
    position: relative;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, var(--p-radius-lg));
    box-shadow: var(--ha-card-box-shadow, var(--p-elev-1));
    border: 1px solid var(--p-divider);
    transition:
      box-shadow var(--p-motion-normal),
      transform var(--p-motion-normal);
    display: flex;
    height: auto; /* let HA grid define height */
    min-height: 0;
    box-sizing: border-box;
    gap: 0;
    isolation: isolate;
  }
  ha-card > div {
    padding: 0 16px;
    margin: 0;
  }
  ha-card > div:first-child {
    padding-top: 16px;
  }
  ha-card > div:not(:has(.graph)) {
    padding-bottom: 16px;
  }
  ha-card > div:has(.graph) {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    padding: 0 16px;
    margin: 0;
    height: 100%;
  }
  ha-card .graph {
    padding: 0;
    margin: 0;
    order: 10;
  }
  ha-card[points] .line--points,
  ha-card[labels] .graph__labels.--primary {
    opacity: 0;
    transition: opacity var(--p-motion-normal);
    animation: none;
  }
  ha-card[labels-secondary] .graph__labels.--secondary {
    opacity: 0;
    transition: opacity var(--p-motion-normal);
    animation: none;
  }
  ha-card[points]:hover .line--points,
  ha-card:hover .graph__labels.--primary,
  ha-card:hover .graph__labels.--secondary {
      opacity: 1;
  }
  ha-card[fill] path {
    stroke-linecap: initial;
    stroke-linejoin: initial;
  }
  ha-card .graph__legend {
    order: -1;
    padding: 0 16px 8px 16px;
  }
  ha-card[group] {
    padding: 0;
  }
  ha-card[group] > div {
    padding-left: 0;
    padding-right: 0;
  }
  ha-card[group] .graph__legend {
    padding-left: 0;
    padding-right: 0;
  }
  ha-card[hover] {
    cursor: pointer;
  }
  ha-card[hover]:hover {
    box-shadow: var(--p-elev-2);
    transform: translateY(-2px);
  }
  ha-card[hover]:active {
    transform: translateY(0) scale(0.997);
    box-shadow: var(--p-elev-1);
    transition-duration: 90ms;
  }
  ha-card:focus-visible {
    outline: 2px solid var(--p-accent);
    outline-offset: 2px;
  }
  ha-spinner {
    margin: 4px auto;
  }
  .flex {
    display: flex;
    display: -webkit-flex;
    min-width: 0;
  }
  .header {
    justify-content: space-between;
    flex-shrink: 0;
  }
  .header[loc="center"] {
    justify-content: space-around;
  }
  .header[loc="left"] {
    align-self: flex-start;
  }
  .header[loc="right"] {
    align-self: flex-end;
  }
  .name {
    align-items: center;
    min-width: 0;
    letter-spacing: var(--mcg-title-letter-spacing, -0.01em);
  }
  .name > span {
    font-size: 1.2em;
    font-weight: var(--mcg-title-font-weight, 500);
    max-height: 1.4em;
    min-height: 1.4em;
    opacity: .65;
    text-wrap: pretty;
  }
  .icon {
    color: var(--state-icon-color, var(--p-accent));
    display: inline-block;
    flex: 0 0 1.7em;
    text-align: center;
  }
  .icon > ha-icon {
    height: 1.7em;
    width: 1.7em;
  }
  .icon[loc="left"] {
    order: -1;
    margin-right: .6em;
    margin-left: 0;
  }
  .icon[loc="state"] {
    align-self: center;
  }
  .states {
    align-items: flex-start;
    font-weight: 300;
    justify-content: space-between;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }
  .states .icon {
    align-self: center;
    margin-left: 0;
  }
  .states[loc="center"] {
    justify-content: space-evenly;
  }
  .states[loc="right"] > .state {
    margin-left: auto;
    order: 2;
  }
  .states[loc="center"] .states--secondary,
  .states[loc="right"] .states--secondary {
    margin-left: 0;
  }
  .states[loc="center"] .states--secondary {
    align-items: center;
  }
  .states[loc="right"] .states--secondary {
    align-items: flex-start;
  }
  .states[loc="center"] .state__time {
    left: 50%;
    transform: translateX(-50%);
  }
  .states > .icon > ha-icon {
    height: 2em !important;
    width: 2em !important;
  }
  .states--secondary {
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    align-items: flex-end;
    margin-left: 1rem;
    min-width: 0;
    margin-left: 1.4em;
  }
  .states--secondary:empty {
    display: none;
  }
  .state {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
    min-width: 0;
  }
  .state > svg {
    align-self: center;
    border-radius: 100%;
  }
  .state--small {
    font-size: .6em;
    margin-bottom: .6rem;
    flex-wrap: nowrap;
  }
  .state--small > svg {
    position: absolute;
    left: -1.6em;
    align-self: center;
    height: 1em;
    width: 1em;
    border-radius: 100%;
    margin-right: 1em;
  }
  .state--small:last-child {
    margin-bottom: 0;
  }
  .states--secondary > :only-child {
    font-size: 1em;
    margin-bottom: 0;
  }
  .states--secondary > :only-child svg {
    display: none;
  }
  .state__value {
    display: inline-block;
    font-size: 2.4em;
    margin-right: .25rem;
    line-height: 1.2em;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    transition: color var(--p-motion-normal);
  }
  .state__uom {
    flex: 1;
    align-self: flex-end;
    display: inline-block;
    font-size: 1.4em;
    font-weight: 400;
    line-height: 1.6em;
    margin-top: .1em;
    opacity: .6;
    vertical-align: bottom;
  }
  .state--small .state__uom {
    flex: 1;
  }
  .state__time {
    font-size: .95rem;
    font-weight: 500;
    bottom: -1.1rem;
    left: 0;
    opacity: .75;
    position: absolute;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    animation: fade 0.3s var(--p-ease);
    transition: opacity var(--p-motion-fast);
  }
  .states[loc="right"] .state__time {
    left: initial;
    right: 0;
  }
  .graph {
    align-self: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0;
    width: 100%;
    min-height: 0;
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  .graph__container {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .graph__container__svg {
    cursor: default;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    /* relative so the child svg absolute positioning doesn't leak */
    position: relative;
  }
  .graph__container__svg > svg {
    overflow: visible;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* Ensure no extra baseline space from inline SVG rendering */
    vertical-align: top;
  }
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .fill[anim="false"] {
    animation: reveal .25s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .fill[anim="false"][type="fade"] {
    animation: reveal-2 .25s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .line--points[anim="false"],
  .line[anim="false"] {
    animation: pop .25s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .line--points[inactive],
  .line--rect[inactive],
  .fill--rect[inactive] {
    opacity: 0 !important;
    animation: none !important;
    transition: all .15s !important;
  }
  .line--points[tooltip] .line--point[inactive] {
    opacity: 0;
  }
  .line--point {
    cursor: pointer;
    fill: var(--primary-background-color, white);
    stroke-width: inherit;
    transition:
      transform var(--p-motion-fast),
      filter var(--p-motion-fast),
      fill var(--p-motion-fast);
  }
  .line--point:hover {
    fill: var(--mcg-hover, inherit) !important;
    transform: scale(1.15);
    filter: drop-shadow(0 2px 4px color-mix(in oklab, var(--p-fg-1) 20%, transparent));
  }
  .bars {
    animation: pop .25s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .bars[anim] {
    animation: bars .5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .bar {
    transition:
      transform var(--p-motion-fast),
      opacity var(--p-motion-fast),
      filter var(--p-motion-fast);
  }
  .bar:hover {
    opacity: 0.85;
    cursor: pointer;
    filter: brightness(1.08) drop-shadow(0 2px 4px color-mix(in oklab, var(--p-fg-1) 16%, transparent));
    transform: translateY(-1px);
  }
  ha-card[gradient] .line--point:hover {
    fill: var(--primary-text-color, white);
  }
  path,
  .line--points,
  .fill {
    opacity: 0;
  }
  .line--points[anim="true"][init] {
    animation: pop .5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .fill[anim="true"][init] {
    animation: reveal .5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .fill[anim="true"][init][type="fade"] {
    animation: reveal-2 .5s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .line[anim="true"][init] {
    animation: dash 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
  }
  .graph__labels.--secondary {
    right: 0;
    margin-right: 0px;
    align-items: flex-end;
  }
  .graph__labels {
    align-items: flex-start;
    flex-direction: column;
    font-size: calc(.15em + 8.5px);
    font-weight: 500;
    justify-content: space-between;
    margin-right: 10px;
    padding: .6em;
    position: absolute;
    pointer-events: none;
    top: 0; bottom: 0;
    opacity: .85;
    font-variant-numeric: tabular-nums;
  }
  .graph__labels > span {
    cursor: pointer;
    color: var(--p-fg-1);
    background: var(--p-glass-bg);
    border-radius: var(--p-radius-pill);
    padding: .3em .8em;
    box-shadow: var(--p-elev-pill);
    border: 1px solid var(--p-glass-border);
    backdrop-filter: var(--p-blur-glass);
    -webkit-backdrop-filter: var(--p-blur-glass);
    transition:
      transform var(--p-motion-fast),
      box-shadow var(--p-motion-fast),
      background var(--p-motion-fast);
  }
  .graph__labels > span:hover {
    box-shadow: var(--p-elev-2);
    transform: translateY(-1px);
    background: color-mix(in oklab, var(--p-surface) 88%, transparent);
  }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .graph__labels > span {
      background: color-mix(in oklab, var(--p-surface) 92%, var(--p-fg-1));
    }
  }
  .graph__legend {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 16px 0 0 0;
    margin: 0;
    flex-wrap: wrap;
    flex-shrink: 0;
  }
  .graph__legend__item {
    cursor: pointer;
    display: flex;
    min-width: 0;
    margin: .4em;
    align-items: center;
    padding: 0.3em 0.6em;
    border-radius: var(--p-radius-sm);
    transition:
      transform var(--p-motion-fast),
      box-shadow var(--p-motion-fast),
      background var(--p-motion-fast);
  }
  .graph__legend__item:hover {
    background: color-mix(in oklab, var(--p-fg-1) 6%, transparent);
    transform: translateY(-1px);
    box-shadow: var(--p-elev-1);
  }
  .graph__legend__item:active {
    transform: scale(0.96);
    box-shadow: var(--p-elev-pressed);
    transition-duration: 80ms;
  }
  .graph__legend__item:focus-visible {
    outline: 2px solid var(--p-accent);
    outline-offset: 2px;
  }
  .graph__legend__item span {
    opacity: .75;
    margin-left: .4em;
  }
  .graph__legend__item svg {
    border-radius: 100%;
    min-width: 10px;
  }
  .info {
    justify-content: space-between;
    align-items: middle;
    flex-shrink: 0;
  }
  .info__item {
    display: flex;
    flex-flow: column;
    text-align: center;
  }
  .info__item:last-child {
    align-items: flex-end;
    text-align: right;
  }
  .info__item:first-child {
    align-items: flex-start;
    text-align: left;
  }
  .info__item__type {
    text-transform: capitalize;
    font-weight: 500;
    opacity: .9;
  }
  .info__item__time,
  .info__item__value {
    opacity: .75;
    font-variant-numeric: tabular-nums;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* Visually hidden but exposed to screen readers (graph text alternative). */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Opt-out of the premium layer (appearance: minimal): flat surfaces, no glass
     blur, no hover lift — for users who prefer a quieter card. */
  :host([data-appearance="minimal"]) .graph__labels > span {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: color-mix(in oklab, var(--p-surface) 92%, var(--p-fg-1));
  }
  :host([data-appearance="minimal"]) ha-card[hover]:hover {
    transform: none;
    box-shadow: var(--ha-card-box-shadow, var(--p-elev-1));
  }

  /* Honour the user's reduced-motion preference: collapse spring durations and
     stop decorative animations. */
  @media (prefers-reduced-motion: reduce) {
    :host {
      --p-motion-fast: 1ms var(--p-ease);
      --p-motion-normal: 1ms var(--p-ease);
    }
    ha-card,
    ha-card[hover]:hover,
    .line--point,
    .bar,
    .graph__legend__item,
    .graph__labels > span {
      transition-duration: 1ms;
    }
    .fill,
    .line,
    .line--points,
    .bars,
    .state__time {
      animation: none !important;
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
      transform: translateY(4px);
    }
    100% {
      opacity: 0.75;
      transform: translateY(0);
    }
  }
  @keyframes reveal {
    0% { opacity: 0; }
    100% { opacity: .15; }
  }
  @keyframes reveal-2 {
    0% { opacity: 0; }
    100% { opacity: .4; }
  }
  @keyframes pop {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes bars {
    0% { opacity: 0; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes dash {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      stroke-dashoffset: 0;
    }
  }`;

export default style;
