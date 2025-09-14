/**
 * Advanced chart types for mini-graph-card
 * Supports stacked area charts, candlestick charts, and other complex visualizations
 */

import { svg } from 'lit-element';
import { interpolateRgb } from 'd3-interpolate';

export class AdvancedCharts {
  constructor(config, entityData) {
    this.config = config;
    this.entityData = entityData;
    this.chartCache = new Map();
  }

  /**
   * Render stacked area chart
   * Perfect for showing multiple related metrics that add up to a total
   */
  renderStackedArea(entities, bound, dimensions) {
    const { width = 500, height = 100 } = dimensions;
    const layers = this.calculateStackedLayers(entities, bound);

    if (!layers.length) return svg``;

    const paths = layers.map((layer, index) => {
      const color = this.getEntityColor(index);
      const path = this.createAreaPath(layer.points, height);

      return svg`
        <path
          class="stacked-area-layer"
          d="${path}"
          fill="${color}"
          fill-opacity="0.7"
          stroke="${color}"
          stroke-width="1"
          style="transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);"
          @mouseover="${e => this.handleStackedHover(e, layer, index)}"
          @mouseout="${() => this.handleStackedOut()}"
        />
      `;
    });

    return svg`
      <g class="stacked-area-chart">
        ${paths}
      </g>
    `;
  }

  /**
   * Render candlestick chart
   * Ideal for financial data or any OHLC (Open, High, Low, Close) data
   */
  renderCandlestick(ohlcData, bound, dimensions) {
    const { width = 500, height = 100 } = dimensions;
    const candleWidth = Math.max(2, (width / ohlcData.length) * 0.8);

    const candles = ohlcData.map((candle, index) => {
      const x = (index * width) / ohlcData.length + candleWidth / 2;
      const {
        open, high, low, close,
      } = candle;

      // Normalize values to chart height
      const yOpen = height - ((open - bound[0]) / (bound[1] - bound[0])) * height;
      const yHigh = height - ((high - bound[0]) / (bound[1] - bound[0])) * height;
      const yLow = height - ((low - bound[0]) / (bound[1] - bound[0])) * height;
      const yClose = height - ((close - bound[0]) / (bound[1] - bound[0])) * height;

      const bodyHeight = Math.abs(yClose - yOpen);
      const bodyTop = Math.min(yOpen, yClose);
      const isUpward = close > open;

      const bodyColor = isUpward ? '#4caf50' : '#f44336';
      const wickColor = isUpward ? '#2e7d32' : '#c62828';

      return svg`
        <g class="candlestick" data-index="${index}">
          <!-- High-Low Wick -->
          <line
            x1="${x}" y1="${yHigh}"
            x2="${x}" y2="${yLow}"
            stroke="${wickColor}"
            stroke-width="1"
          />

          <!-- Open-Close Body -->
          <rect
            x="${x - candleWidth / 2}"
            y="${bodyTop}"
            width="${candleWidth}"
            height="${Math.max(1, bodyHeight)}"
            fill="${bodyColor}"
            stroke="${wickColor}"
            stroke-width="1"
            style="transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);"
            @mouseover="${e => this.handleCandleHover(e, candle, index)}"
            @mouseout="${() => this.handleCandleOut()}"
          />

          <!-- High/Low markers for precision -->
          <circle cx="${x}" cy="${yHigh}" r="1" fill="${wickColor}" />
          <circle cx="${x}" cy="${yLow}" r="1" fill="${wickColor}" />
        </g>
      `;
    });

    return svg`
      <g class="candlestick-chart">
        ${candles}
      </g>
    `;
  }

  /**
   * Render multi-axis line chart
   * Allows different entities to use different Y-axes scales
   */
  renderMultiAxisLines(entities, bounds, dimensions) {
    const { width = 500, height = 100 } = dimensions;
    const lines = [];

    entities.forEach((entity, index) => {
      if (!entity.coords || !entity.coords.length) return;

      const bound = bounds[index] || [0, 1];
      const color = this.getEntityColor(index);
      const axisPosition = index % 2 === 0 ? 'left' : 'right';

      // Create normalized path
      const pathData = this.createLinePath(entity.coords, bound, height);

      lines.push(svg`
        <path
          class="multi-axis-line"
          d="${pathData}"
          fill="none"
          stroke="${color}"
          stroke-width="2"
          data-axis="${axisPosition}"
          data-entity="${index}"
          style="transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);"
        />
      `);
    });

    return svg`
      <g class="multi-axis-chart">
        ${lines}
      </g>
    `;
  }

  /**
   * Calculate stacked layers for area chart
   */
  calculateStackedLayers(entities, bound) {
    if (!entities.length) return [];

    const maxLength = Math.max(...entities.map(e => (e.coords && e.coords.length) || 0));
    const layers = [];

    // Initialize cumulative values
    const cumulativeValues = new Array(maxLength).fill(0);

    entities.forEach((entity, entityIndex) => {
      if (!entity.coords) return;

      const points = [];
      let previousY = 0;

      entity.coords.forEach((coord, pointIndex) => {
        const baseY = cumulativeValues[pointIndex] || 0;
        const value = coord[2] || 0; // V index
        const stackedY = baseY + value;

        // Normalize to chart bounds
        const normalizedY = 100 - ((stackedY - bound[0]) / (bound[1] - bound[0])) * 100;

        points.push([coord[0], Math.max(0, Math.min(100, normalizedY)), value]);
        cumulativeValues[pointIndex] = stackedY;
        previousY = normalizedY;
      });

      layers.push({
        entityIndex,
        points,
        entity,
        totalValues: [...cumulativeValues],
      });
    });

    return layers;
  }

  /**
   * Create SVG path for area chart
   */
  createAreaPath(points, height) {
    if (!points.length) return '';

    const width = 500; // Standard width
    let path = '';

    // Start from bottom-left
    const firstPoint = points[0];
    const startX = (firstPoint[0] / width) * width;
    path += `M ${startX},${height}`;

    // Draw to first point
    path += ` L ${startX},${firstPoint[1]}`;

    // Draw the top line
    points.forEach((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = point[1];
      path += ` L ${x},${y}`;
    });

    // Close the area by going back to bottom-right, then bottom-left
    const lastIndex = points.length - 1;
    const endX = (lastIndex / (points.length - 1)) * width;
    path += ` L ${endX},${height}`;
    path += ' Z';

    return path;
  }

  /**
   * Create SVG path for line chart
   */
  createLinePath(coords, bound, height) {
    if (!coords.length) return '';

    const width = 500;
    let path = '';

    coords.forEach((coord, index) => {
      const x = (index / (coords.length - 1)) * width;
      const normalizedY = height - ((coord[2] - bound[0]) / (bound[1] - bound[0])) * height;
      const y = Math.max(0, Math.min(height, normalizedY));

      if (index === 0) {
        path += `M ${x},${y}`;
      } else {
        path += ` L ${x},${y}`;
      }
    });

    return path;
  }

  /**
   * Get entity color with fallback
   */
  getEntityColor(index) {
    const defaultColors = [
      '#03a9f4', '#4caf50', '#ff9800', '#f44336',
      '#9c27b0', '#00bcd4', '#cddc39', '#ff5722',
    ];

    if (this.config.line_color && this.config.line_color[index]) {
      return this.config.line_color[index];
    }

    return defaultColors[index % defaultColors.length];
  }

  /**
   * Handle hover events for stacked areas
   */
  handleStackedHover(event, layer, index) {
    // Highlight the layer
    event.target.style.fillOpacity = '0.9';
    event.target.style.strokeWidth = '2';

    // Emit custom event for tooltip
    const detail = {
      type: 'stacked-area',
      layer,
      index,
      entity: layer.entity,
    };

    event.target.dispatchEvent(new CustomEvent('chart-hover', {
      detail,
      bubbles: true,
    }));
  }

  handleStackedOut() {
    // Reset all layers
    const layers = document.querySelectorAll('.stacked-area-layer');
    layers.forEach((layer) => {
      layer.style.fillOpacity = '0.7';
      layer.style.strokeWidth = '1';
    });
  }

  /**
   * Handle hover events for candlesticks
   */
  handleCandleHover(event, candle, index) {
    // Highlight the candle
    const rect = event.target;
    rect.style.transform = 'scaleY(1.1)';
    rect.style.filter = 'brightness(1.1)';

    // Emit custom event for tooltip
    const detail = {
      type: 'candlestick',
      candle,
      index,
      ohlc: candle,
    };

    event.target.dispatchEvent(new CustomEvent('chart-hover', {
      detail,
      bubbles: true,
    }));
  }

  handleCandleOut() {
    const rects = document.querySelectorAll('.candlestick rect');
    rects.forEach((rect) => {
      rect.style.transform = 'scaleY(1)';
      rect.style.filter = '';
    });
  }

  /**
   * Performance optimization: cache complex calculations
   */
  getCachedCalculation(key, calculator) {
    if (this.chartCache.has(key)) {
      return this.chartCache.get(key);
    }

    const result = calculator();
    this.chartCache.set(key, result);

    // Clear cache after 30 seconds to prevent memory leaks
    setTimeout(() => {
      this.chartCache.delete(key);
    }, 30000);

    return result;
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.chartCache.clear();
  }
}

// Chart type constants
export const ChartTypes = {
  LINE: 'line',
  AREA: 'area',
  STACKED_AREA: 'stacked_area',
  BAR: 'bar',
  CANDLESTICK: 'candlestick',
  MULTI_AXIS: 'multi_axis',
};

// Utility functions for chart data processing
export const ChartUtils = {
  /**
   * Convert time series data to OHLC format
   */
  convertToOHLC(data, interval = '1h') {
    if (!data.length) return [];

    const ohlcData = [];
    const intervalMs = this.parseInterval(interval);
    let currentBucket = null;
    let bucketValues = [];

    data.forEach((point) => {
      const timestamp = point[0]; // X coordinate (time)
      const value = point[2]; // V coordinate (value)

      const bucketStart = Math.floor(timestamp / intervalMs) * intervalMs;

      if (currentBucket !== bucketStart) {
        // Finalize previous bucket
        if (bucketValues.length > 0) {
          ohlcData.push({
            timestamp: currentBucket,
            open: bucketValues[0],
            high: Math.max(...bucketValues),
            low: Math.min(...bucketValues),
            close: bucketValues[bucketValues.length - 1],
          });
        }

        // Start new bucket
        currentBucket = bucketStart;
        bucketValues = [value];
      } else {
        bucketValues.push(value);
      }
    });

    // Don't forget the last bucket
    if (bucketValues.length > 0) {
      ohlcData.push({
        timestamp: currentBucket,
        open: bucketValues[0],
        high: Math.max(...bucketValues),
        low: Math.min(...bucketValues),
        close: bucketValues[bucketValues.length - 1],
      });
    }

    return ohlcData;
  },

  parseInterval(interval) {
    const units = {
      'm': 60000, // minute
      'h': 3600000, // hour
      'd': 86400000, // day
    };

    const match = interval.match(/^(\d+)([mhd])$/);
    if (!match) return 3600000; // Default 1 hour

    const [, amount, unit] = match;
    return parseInt(amount) * units[unit];
  },
};
