/**
 * Performance optimization system for large datasets
 * Implements data sampling, virtual rendering, and adaptive quality
 */

export class PerformanceOptimizer {
  constructor(config = {}) {
    this.config = {
      maxDataPoints: 1000,
      virtualRenderingThreshold: 2000,
      qualityAutoAdjust: true,
      sampleMethod: 'LTTB', // Largest Triangle Three Buckets algorithm
      enableWebWorkers: true,
      memoryLimit: 100 * 1024 * 1024, // 100MB
      ...config,
    };

    this.worker = null;
    this.renderQueue = [];
    this.isProcessing = false;
    this.performanceMetrics = {
      renderTime: [],
      dataPoints: 0,
      frameRate: 60,
      memoryUsage: 0,
    };

    this.initializeWebWorker();
    this.startPerformanceMonitoring();
  }

  /**
   * Initialize Web Worker for heavy computations
   */
  initializeWebWorker() {
    if (!this.config.enableWebWorkers || typeof Worker === 'undefined') return;

    try {
      const workerCode = `
        // LTTB (Largest Triangle Three Buckets) algorithm
        function largestTriangleThreeBuckets(data, threshold) {
          if (threshold >= data.length || threshold === 0) {
            return data;
          }

          const sampled = [];
          const bucketSize = (data.length - 2) / (threshold - 2);

          sampled.push(data[0]); // Always add the first point

          for (let i = 0; i < threshold - 2; i++) {
            const avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
            const avgRangeEnd = Math.floor((i + 2) * bucketSize) + 1;

            // Calculate average point in next bucket
            let avgX = 0, avgY = 0;
            for (let j = avgRangeStart; j < avgRangeEnd; j++) {
              avgX += data[j][0];
              avgY += data[j][1];
            }
            avgX /= (avgRangeEnd - avgRangeStart);
            avgY /= (avgRangeEnd - avgRangeStart);

            // Get range for current bucket
            const rangeStart = Math.floor(i * bucketSize) + 1;
            const rangeEnd = Math.floor((i + 1) * bucketSize) + 1;

            let maxArea = -1;
            let maxAreaPoint = null;

            for (let j = rangeStart; j < rangeEnd; j++) {
              // Calculate area of triangle
              const area = Math.abs(
                (sampled[sampled.length - 1][0] - avgX) * (data[j][1] - sampled[sampled.length - 1][1]) -
                (sampled[sampled.length - 1][0] - data[j][0]) * (avgY - sampled[sampled.length - 1][1])
              ) * 0.5;

              if (area > maxArea) {
                maxArea = area;
                maxAreaPoint = data[j];
              }
            }

            sampled.push(maxAreaPoint);
          }

          sampled.push(data[data.length - 1]); // Always add the last point

          return sampled;
        }

        // Douglas-Peucker algorithm for line simplification
        function douglasPeucker(points, epsilon) {
          if (points.length < 3) return points;

          // Find the point with maximum distance
          let dmax = 0;
          let index = 0;
          for (let i = 1; i < points.length - 1; i++) {
            const d = perpendicularDistance(points[i], points[0], points[points.length - 1]);
            if (d > dmax) {
              index = i;
              dmax = d;
            }
          }

          // If max distance is greater than epsilon, recursively simplify
          if (dmax > epsilon) {
            const recResults1 = douglasPeucker(points.slice(0, index + 1), epsilon);
            const recResults2 = douglasPeucker(points.slice(index), epsilon);

            return recResults1.slice(0, -1).concat(recResults2);
          } else {
            return [points[0], points[points.length - 1]];
          }
        }

        function perpendicularDistance(point, lineStart, lineEnd) {
          const dx = lineEnd[0] - lineStart[0];
          const dy = lineEnd[1] - lineStart[1];

          if (dx === 0 && dy === 0) {
            return Math.sqrt((point[0] - lineStart[0]) ** 2 + (point[1] - lineStart[1]) ** 2);
          }

          const t = ((point[0] - lineStart[0]) * dx + (point[1] - lineStart[1]) * dy) / (dx * dx + dy * dy);
          const projection = [lineStart[0] + t * dx, lineStart[1] + t * dy];

          return Math.sqrt((point[0] - projection[0]) ** 2 + (point[1] - projection[1]) ** 2);
        }

        self.onmessage = function(e) {
          const { type, data, options } = e.data;

          switch (type) {
            case 'LTTB':
              const sampled = largestTriangleThreeBuckets(data, options.threshold);
              self.postMessage({ type: 'LTTB_RESULT', data: sampled });
              break;

            case 'DOUGLAS_PEUCKER':
              const simplified = douglasPeucker(data, options.epsilon);
              self.postMessage({ type: 'DOUGLAS_PEUCKER_RESULT', data: simplified });
              break;

            case 'AGGREGATE':
              // Aggregate data points by time intervals
              const aggregated = this.aggregateData(data, options);
              self.postMessage({ type: 'AGGREGATE_RESULT', data: aggregated });
              break;
          }
        };
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));

      this.worker.onmessage = (e) => {
        this.handleWorkerMessage(e.data);
      };

      this.worker.onerror = (error) => {
        console.warn('MGC Performance: Worker error:', error);
        this.worker = null;
      };
    } catch (error) {
      console.warn('MGC Performance: Worker initialization failed:', error);
    }
  }

  /**
   * Optimize dataset based on size and performance requirements
   */
  async optimizeDataset(data, entityIndex = 0) {
    if (!data || data.length === 0) return data;

    const startTime = performance.now();
    this.performanceMetrics.dataPoints = data.length;

    // Check if optimization is needed
    if (data.length <= this.config.maxDataPoints) {
      return data;
    }

    let optimizedData = data;

    // Choose optimization strategy based on data size and performance
    if (this.config.qualityAutoAdjust) {
      const strategy = this.chooseOptimizationStrategy(data.length);
      optimizedData = await this.applyOptimization(data, strategy, entityIndex);
    } else {
      // Use configured method
      optimizedData = await this.applySampling(data, this.config.sampleMethod, this.config.maxDataPoints);
    }

    // Record performance metrics
    const renderTime = performance.now() - startTime;
    this.performanceMetrics.renderTime.push(renderTime);

    // Keep only recent render times for averaging
    if (this.performanceMetrics.renderTime.length > 10) {
      this.performanceMetrics.renderTime.shift();
    }

    return optimizedData;
  }

  /**
   * Choose optimization strategy based on data characteristics
   */
  chooseOptimizationStrategy(dataLength) {
    const avgRenderTime = this.getAverageRenderTime();
    const frameRate = this.performanceMetrics.frameRate;

    if (dataLength > 10000 || avgRenderTime > 100 || frameRate < 30) {
      return {
        method: 'LTTB',
        threshold: Math.min(500, this.config.maxDataPoints),
        aggressive: true,
      };
    } else if (dataLength > 5000 || avgRenderTime > 50) {
      return {
        method: 'LTTB',
        threshold: Math.min(800, this.config.maxDataPoints),
        aggressive: false,
      };
    } else {
      return {
        method: 'DOUGLAS_PEUCKER',
        epsilon: 0.5,
        threshold: this.config.maxDataPoints,
      };
    }
  }

  /**
   * Apply selected optimization strategy
   */
  async applyOptimization(data, strategy, entityIndex) {
    switch (strategy.method) {
      case 'LTTB':
        return await this.applySampling(data, 'LTTB', strategy.threshold);

      case 'DOUGLAS_PEUCKER':
        return await this.applyLineSimplification(data, strategy.epsilon);

      case 'UNIFORM':
        return this.applyUniformSampling(data, strategy.threshold);

      case 'ADAPTIVE':
        return await this.applyAdaptiveSampling(data, strategy.threshold, entityIndex);

      default:
        return data;
    }
  }

  /**
   * Apply LTTB (Largest Triangle Three Buckets) sampling
   */
  async applySampling(data, method, threshold) {
    if (this.worker && method === 'LTTB') {
      return new Promise((resolve) => {
        const requestId = Date.now();
        const listener = (e) => {
          if (e.data.type === 'LTTB_RESULT') {
            this.worker.removeEventListener('message', listener);
            resolve(e.data.data);
          }
        };

        this.worker.addEventListener('message', listener);
        this.worker.postMessage({
          type: 'LTTB',
          data,
          options: { threshold },
        });

        // Timeout fallback
        setTimeout(() => {
          this.worker.removeEventListener('message', listener);
          resolve(this.applyUniformSampling(data, threshold));
        }, 5000);
      });
    } else {
      // Fallback to uniform sampling
      return this.applyUniformSampling(data, threshold);
    }
  }

  /**
   * Apply uniform sampling (simple but fast)
   */
  applyUniformSampling(data, maxPoints) {
    if (data.length <= maxPoints) return data;

    const step = data.length / maxPoints;
    const sampled = [];

    for (let i = 0; i < maxPoints; i++) {
      const index = Math.floor(i * step);
      sampled.push(data[index]);
    }

    // Always include the last point
    if (sampled[sampled.length - 1] !== data[data.length - 1]) {
      sampled.push(data[data.length - 1]);
    }

    return sampled;
  }

  /**
   * Apply line simplification using Douglas-Peucker algorithm
   */
  async applyLineSimplification(data, epsilon) {
    if (this.worker) {
      return new Promise((resolve) => {
        const listener = (e) => {
          if (e.data.type === 'DOUGLAS_PEUCKER_RESULT') {
            this.worker.removeEventListener('message', listener);
            resolve(e.data.data);
          }
        };

        this.worker.addEventListener('message', listener);
        this.worker.postMessage({
          type: 'DOUGLAS_PEUCKER',
          data,
          options: { epsilon },
        });

        // Timeout fallback
        setTimeout(() => {
          this.worker.removeEventListener('message', listener);
          resolve(data);
        }, 5000);
      });
    }

    return data; // Fallback if no worker
  }

  /**
   * Adaptive sampling based on data variance
   */
  async applyAdaptiveSampling(data, maxPoints, entityIndex) {
    if (data.length <= maxPoints) return data;

    // Calculate variance in different segments
    const segments = 10;
    const segmentSize = Math.floor(data.length / segments);
    const variances = [];

    for (let i = 0; i < segments; i++) {
      const start = i * segmentSize;
      const end = Math.min(start + segmentSize, data.length);
      const segment = data.slice(start, end);
      variances.push(this.calculateVariance(segment));
    }

    // Allocate points based on variance (more points to high-variance areas)
    const totalVariance = variances.reduce((sum, v) => sum + v, 0);
    const sampled = [];

    for (let i = 0; i < segments; i++) {
      const start = i * segmentSize;
      const end = Math.min(start + segmentSize, data.length);
      const segment = data.slice(start, end);

      const allocationRatio = totalVariance > 0 ? variances[i] / totalVariance : 1 / segments;
      const pointsForSegment = Math.max(1, Math.floor(maxPoints * allocationRatio));

      const segmentSampled = this.applyUniformSampling(segment, pointsForSegment);
      sampled.push(...segmentSampled);
    }

    return sampled;
  }

  /**
   * Calculate variance for adaptive sampling
   */
  calculateVariance(data) {
    if (data.length < 2) return 0;

    const values = data.map(point => point[1] || point.y || point.value || 0);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;

    return variance;
  }

  /**
   * Virtual rendering for very large datasets
   */
  createVirtualRenderer(data, viewportBounds) {
    const { startIndex, endIndex } = this.calculateVisibleRange(data, viewportBounds);
    const visibleData = data.slice(startIndex, endIndex);

    return {
      visibleData,
      totalDataPoints: data.length,
      visibleRange: { startIndex, endIndex },
      getBufferedData: (bufferSize = 100) => {
        const bufferedStart = Math.max(0, startIndex - bufferSize);
        const bufferedEnd = Math.min(data.length, endIndex + bufferSize);
        return data.slice(bufferedStart, bufferedEnd);
      },
    };
  }

  calculateVisibleRange(data, viewportBounds) {
    const { xMin, xMax } = viewportBounds;
    let startIndex = 0;
    let endIndex = data.length;

    // Binary search for start index
    let left = 0; let
      right = data.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const xValue = data[mid][0] || data[mid].x || data[mid].timestamp || mid;

      if (xValue < xMin) {
        left = mid + 1;
      } else {
        right = mid - 1;
        startIndex = mid;
      }
    }

    // Binary search for end index
    left = startIndex;
    right = data.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const xValue = data[mid][0] || data[mid].x || data[mid].timestamp || mid;

      if (xValue <= xMax) {
        left = mid + 1;
        endIndex = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return { startIndex, endIndex };
  }

  /**
   * Performance monitoring
   */
  startPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    const monitor = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        this.performanceMetrics.frameRate = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        // Monitor memory usage if available
        if (performance.memory) {
          this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;
        }

        // Auto-adjust quality if performance is poor
        if (this.config.qualityAutoAdjust && this.performanceMetrics.frameRate < 30) {
          this.config.maxDataPoints = Math.max(100, this.config.maxDataPoints * 0.8);
        }
      }

      requestAnimationFrame(monitor);
    };

    requestAnimationFrame(monitor);
  }

  getAverageRenderTime() {
    if (this.performanceMetrics.renderTime.length === 0) return 0;
    return this.performanceMetrics.renderTime.reduce((sum, time) => sum + time, 0) / this.performanceMetrics.renderTime.length;
  }

  /**
   * Handle messages from web worker
   */
  handleWorkerMessage(message) {
    // Worker messages are handled by individual promises
    // This is a placeholder for additional worker communication
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    return {
      frameRate: this.performanceMetrics.frameRate,
      averageRenderTime: `${this.getAverageRenderTime().toFixed(2)}ms`,
      dataPoints: this.performanceMetrics.dataPoints,
      memoryUsage: `${(this.performanceMetrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`,
      optimizationActive: this.performanceMetrics.dataPoints > this.config.maxDataPoints,
      reductionRatio: this.performanceMetrics.dataPoints > 0
        ? `${((this.config.maxDataPoints / this.performanceMetrics.dataPoints) * 100).toFixed(1)}%`
        : '100%',
    };
  }

  /**
   * Cleanup resources
   */
  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// Performance optimization strategies
export const OptimizationStrategies = {
  REAL_TIME: {
    maxDataPoints: 500,
    sampleMethod: 'UNIFORM',
    qualityAutoAdjust: true,
    enableWebWorkers: false, // Real-time data needs immediate processing
  },

  HISTORICAL: {
    maxDataPoints: 2000,
    sampleMethod: 'LTTB',
    qualityAutoAdjust: true,
    enableWebWorkers: true,
  },

  HIGH_PERFORMANCE: {
    maxDataPoints: 200,
    sampleMethod: 'UNIFORM',
    qualityAutoAdjust: false,
    enableWebWorkers: false,
  },

  HIGH_QUALITY: {
    maxDataPoints: 5000,
    sampleMethod: 'LTTB',
    qualityAutoAdjust: false,
    enableWebWorkers: true,
  },
};
