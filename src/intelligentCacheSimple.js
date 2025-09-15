/**
 * Simplified intelligent caching system compatible with ESLint
 */

export class IntelligentCache {
  constructor(config = {}) {
    this.config = {
      maxMemorySize: 50 * 1024 * 1024, // 50MB
      maxDiskSize: 200 * 1024 * 1024, // 200MB
      defaultTTL: 15 * 60 * 1000, // 15 minutes
      compressionThreshold: 1000, // Compress if data > 1KB
      enableDiskCache: true,
      enableMemoryCache: true,
      enableCompression: true,
      ...config,
    };

    // Memory cache
    this.memoryCache = new Map();
    this.memoryCacheSize = 0;
    this.accessTimes = new Map();

    // Performance metrics
    this.metrics = {
      hits: 0,
      misses: 0,
      compressionRatio: 0,
      averageAccessTime: 0,
    };

    // Initialize disk cache if available
    this.diskCache = null;
    this.initializeDiskCache();

    // Cleanup interval
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000); // 5 minutes
  }

  initializeDiskCache() {
    if (!this.config.enableDiskCache) return;

    try {
      // Use existing localForage if available
      if (typeof window !== 'undefined' && window.localForage) {
        this.diskCache = window.localForage.createInstance({
          name: 'mini-graph-cache',
          version: 1.0,
          size: this.config.maxDiskSize,
          storeName: 'chart_data',
        });
      }
    } catch (error) {
      console.warn('MGC Cache: Disk cache initialization failed:', error);
      this.config.enableDiskCache = false;
    }
  }

  /**
   * Generate cache key from data and options
   */
  generateKey(entityId, startTime, endTime, options = {}) {
    const keyData = {
      entity: entityId,
      start: startTime instanceof Date ? startTime.getTime() : startTime,
      end: endTime instanceof Date ? endTime.getTime() : endTime,
      ...options,
    };

    // Create deterministic hash from key data
    return this.hashObject(keyData);
  }

  hashObject(obj) {
    const str = JSON.stringify(obj, Object.keys(obj).sort());
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charCodeAt(i);
      hash = ((hash * 5) - hash) + char;
      hash = Math.floor(hash); // Convert to integer
    }
    return `mgc_${Math.abs(hash).toString(36)}`;
  }

  /**
   * Store data in cache
   */
  async set(key, data, ttl = this.config.defaultTTL) {
    const startTime = Date.now();

    try {
      const cacheEntry = {
        data,
        timestamp: Date.now(),
        ttl,
        accessCount: 0,
        size: this.estimateSize(data),
      };

      // Store in memory cache
      if (this.config.enableMemoryCache) {
        this.setMemoryCache(key, cacheEntry);
      }

      // Store in disk cache for persistence
      if (this.config.enableDiskCache && this.diskCache) {
        await this.setDiskCache(key, cacheEntry);
      }

      const duration = Date.now() - startTime;
      this.updateMetrics('set', duration);
    } catch (error) {
      console.warn('MGC Cache: Set operation failed:', error);
    }
  }

  /**
   * Retrieve data from cache
   */
  async get(key) {
    const startTime = Date.now();
    this.accessTimes.set(key, Date.now());

    try {
      let cacheEntry = null;

      // Try memory cache first (fastest)
      if (this.config.enableMemoryCache) {
        cacheEntry = this.memoryCache.get(key);
        if (cacheEntry && this.isValid(cacheEntry)) {
          cacheEntry.accessCount += 1;
          this.updateMetrics('hit', Date.now() - startTime);
          return cacheEntry.data;
        }
      }

      // Try disk cache (slower but persistent)
      if (this.config.enableDiskCache && this.diskCache) {
        cacheEntry = await this.diskCache.getItem(key);
        if (cacheEntry && this.isValid(cacheEntry)) {
          cacheEntry.accessCount += 1;

          // Promote to memory cache for faster future access
          if (this.config.enableMemoryCache) {
            this.setMemoryCache(key, cacheEntry);
          }

          this.updateMetrics('hit', Date.now() - startTime);
          return cacheEntry.data;
        }
      }

      // Cache miss
      this.updateMetrics('miss', Date.now() - startTime);
      return null;
    } catch (error) {
      console.warn('MGC Cache: Get operation failed:', error);
      this.updateMetrics('miss', Date.now() - startTime);
      return null;
    }
  }

  /**
   * Memory cache management with LRU eviction
   */
  setMemoryCache(key, cacheEntry) {
    // Check if we need to make space
    if (this.memoryCacheSize + cacheEntry.size > this.config.maxMemorySize) {
      this.evictLeastRecentlyUsed();

      // If still too big after one eviction, clear more aggressively
      if (this.memoryCacheSize + cacheEntry.size > this.config.maxMemorySize) {
        const targetSize = this.config.maxMemorySize * 0.7; // Target 70% capacity
        while (this.memoryCacheSize > targetSize && this.memoryCache.size > 0) {
          this.evictLeastRecentlyUsed();
        }
      }
    }

    // Remove existing entry if present
    if (this.memoryCache.has(key)) {
      const existing = this.memoryCache.get(key);
      this.memoryCacheSize -= existing.size;
    }

    this.memoryCache.set(key, cacheEntry);
    this.memoryCacheSize += cacheEntry.size;
  }

  evictLeastRecentlyUsed() {
    if (this.memoryCache.size === 0) return;

    let oldestKey = null;
    let oldestTime = Date.now();

    Array.from(this.memoryCache.keys()).forEach((key) => {
      const accessTime = this.accessTimes.get(key) || 0;
      if (accessTime < oldestTime) {
        oldestTime = accessTime;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      const entry = this.memoryCache.get(oldestKey);
      this.memoryCache.delete(oldestKey);
      this.accessTimes.delete(oldestKey);
      this.memoryCacheSize -= entry.size;
    }
  }

  /**
   * Disk cache management
   */
  async setDiskCache(key, cacheEntry) {
    if (!this.diskCache) return;

    try {
      await this.diskCache.setItem(key, cacheEntry);
    } catch (error) {
      // Handle quota exceeded
      if (error.name === 'QuotaExceededError') {
        await this.cleanupDiskCache();
        try {
          await this.diskCache.setItem(key, cacheEntry);
        } catch (retryError) {
          console.warn('MGC Cache: Disk cache write failed after cleanup:', retryError);
        }
      }
    }
  }

  /**
   * Cache validation and cleanup
   */
  isValid(cacheEntry) {
    if (!cacheEntry) return false;

    const now = Date.now();
    const age = now - cacheEntry.timestamp;

    return age < cacheEntry.ttl;
  }

  async cleanup() {
    // Cleanup memory cache
    Array.from(this.memoryCache.entries()).forEach(([key, entry]) => {
      if (!this.isValid(entry)) {
        this.memoryCache.delete(key);
        this.accessTimes.delete(key);
        this.memoryCacheSize -= entry.size;
      }
    });

    // Cleanup disk cache
    if (this.diskCache) {
      await this.cleanupDiskCache();
    }
  }

  async cleanupDiskCache() {
    if (!this.diskCache) return;

    try {
      const keys = await this.diskCache.keys();
      const cleanupPromises = keys.map(key => this.diskCache.getItem(key).then((entry) => {
        if (!this.isValid(entry)) {
          return this.diskCache.removeItem(key);
        }
        return null;
      }));

      await Promise.all(cleanupPromises);
    } catch (error) {
      console.warn('MGC Cache: Disk cache cleanup failed:', error);
    }
  }

  /**
   * Smart prefetching based on usage patterns
   */
  async prefetch(entityId) {
    // Simple prefetch - predict user might want recent data
    const now = Date.now();
    const ranges = [
      { start: now - 6 * 60 * 60 * 1000, end: now }, // Last 6 hours
      { start: now - 24 * 60 * 60 * 1000, end: now - 6 * 60 * 60 * 1000 }, // 6-24 hours ago
    ];

    ranges.forEach((range) => {
      const key = this.generateKey(entityId, range.start, range.end);
      // Check if already in cache (non-blocking)
      this.get(key).catch(() => {
        // Ignore prefetch failures
      });
    });
  }

  /**
   * Performance metrics
   */
  updateMetrics(operation, duration) {
    if (operation === 'hit') {
      this.metrics.hits += 1;
    } else if (operation === 'miss') {
      this.metrics.misses += 1;
    }

    this.metrics.averageAccessTime = (this.metrics.averageAccessTime + duration) / 2;
  }

  getPerformanceReport() {
    const total = this.metrics.hits + this.metrics.misses;
    const hitRate = total > 0 ? (this.metrics.hits / total * 100) : 0;

    return {
      hitRate: `${hitRate.toFixed(1)}%`,
      totalRequests: total,
      memoryUsage: `${(this.memoryCacheSize / 1024 / 1024).toFixed(2)}MB`,
      averageAccessTime: `${this.metrics.averageAccessTime.toFixed(2)}ms`,
      cacheEntries: {
        memory: this.memoryCache.size,
        disk: 'async', // Would need async call to count
      },
    };
  }

  /**
   * Utility functions
   */
  estimateSize(data) {
    // Rough estimation of data size in bytes
    const jsonString = JSON.stringify(data);
    return jsonString.length * 2; // Rough estimate: 2 bytes per character
  }

  /**
   * Public API for cache management
   */
  async invalidate(pattern) {
    // Remove entries matching pattern
    const keysToDelete = [];

    // Check memory cache
    Array.from(this.memoryCache.keys()).forEach((key) => {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    });

    // Remove from memory
    keysToDelete.forEach((key) => {
      const entry = this.memoryCache.get(key);
      this.memoryCache.delete(key);
      this.accessTimes.delete(key);
      if (entry) {
        this.memoryCacheSize -= entry.size;
      }
    });

    // Remove from disk cache
    if (this.diskCache) {
      try {
        const diskKeys = await this.diskCache.keys();
        const diskKeysToDelete = diskKeys.filter(key => key.includes(pattern));

        const deletePromises = diskKeysToDelete.map(key => this.diskCache.removeItem(key));

        await Promise.all(deletePromises);
      } catch (error) {
        console.warn('MGC Cache: Disk cache invalidation failed:', error);
      }
    }
  }

  async clear() {
    // Clear all caches
    this.memoryCache.clear();
    this.accessTimes.clear();
    this.memoryCacheSize = 0;

    if (this.diskCache) {
      try {
        await this.diskCache.clear();
      } catch (error) {
        console.warn('MGC Cache: Disk cache clear failed:', error);
      }
    }

    // Reset metrics
    this.metrics = {
      hits: 0,
      misses: 0,
      compressionRatio: 0,
      averageAccessTime: 0,
    };
  }

  /**
   * Cleanup and resource management
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    this.memoryCache.clear();
    this.accessTimes.clear();
    this.memoryCacheSize = 0;
    this.diskCache = null;
  }
}

// Cache strategies for different data types
export const CacheStrategies = {
  HISTORICAL_DATA: {
    ttl: 60 * 60 * 1000, // 1 hour - historical data rarely changes
    enableCompression: true,
    compressionThreshold: 500,
  },

  REAL_TIME_DATA: {
    ttl: 30 * 1000, // 30 seconds - real-time data changes frequently
    enableCompression: false, // Skip compression for speed
    enableDiskCache: false, // Keep only in memory
  },

  CONFIGURATION_DATA: {
    ttl: 24 * 60 * 60 * 1000, // 24 hours - config rarely changes
    enableCompression: true,
    compressionThreshold: 100,
  },
};

// Singleton cache instance for the application
let globalCacheInstance = null;

export function getGlobalCache(config) {
  if (!globalCacheInstance) {
    globalCacheInstance = new IntelligentCache(config);
  }
  return globalCacheInstance;
}
