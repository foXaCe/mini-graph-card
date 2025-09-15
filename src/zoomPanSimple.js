/**
 * Simplified zoom/pan controller compatible with ESLint
 * Provides interactive zoom and pan functionality with touch support
 */

export class ZoomPanController {
  constructor(config = {}) {
    this.config = {
      enableZoom: true,
      enablePan: true,
      minZoom: 0.1,
      maxZoom: 10,
      zoomSpeed: 0.1,
      panSpeed: 1,
      wheelZoom: true,
      touchZoom: true,
      touchPan: true,
      ...config,
    };

    // Transform state
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;

    // Interaction state
    this.isDragging = false;
    this.isTouch = false;
    this.lastPointer = { x: 0, y: 0 };
    this.touchDistance = 0;

    // Bound methods for event listeners
    this.handleWheel = this.handleWheel.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    // Animation frame tracking
    this.animationId = null;
  }

  /**
   * Initialize zoom/pan on SVG element
   */
  initialize(svgElement, viewBox) {
    this.svgElement = svgElement;
    this.originalViewBox = viewBox;
    this.currentViewBox = { ...viewBox };

    this.attachEventListeners();
    return this;
  }

  attachEventListeners() {
    if (!this.svgElement) return;

    // Mouse wheel for zoom
    if (this.config.wheelZoom) {
      this.svgElement.addEventListener('wheel', this.handleWheel, { passive: false });
    }

    // Mouse events for pan
    if (this.config.enablePan) {
      this.svgElement.addEventListener('pointerdown', this.handlePointerDown);
      this.svgElement.addEventListener('pointermove', this.handlePointerMove);
      this.svgElement.addEventListener('pointerup', this.handlePointerUp);
    }

    // Touch events
    if (this.config.touchZoom || this.config.touchPan) {
      this.svgElement.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      this.svgElement.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      this.svgElement.addEventListener('touchend', this.handleTouchEnd);
    }

    // Prevent context menu on right click
    this.svgElement.addEventListener('contextmenu', e => e.preventDefault());
  }

  /**
   * Mouse wheel zoom handler
   */
  handleWheel(event) {
    if (!this.config.enableZoom) return;

    event.preventDefault();

    const rect = this.svgElement.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    const delta = -event.deltaY * this.config.zoomSpeed * 0.001;
    this.zoomAt(pointerX, pointerY, delta);
  }

  /**
   * Pointer down handler
   */
  handlePointerDown(event) {
    if (!this.config.enablePan) return;

    event.preventDefault();
    this.isDragging = true;
    this.lastPointer = { x: event.clientX, y: event.clientY };

    this.svgElement.style.cursor = 'grabbing';
  }

  /**
   * Pointer move handler
   */
  handlePointerMove(event) {
    if (!this.isDragging || !this.config.enablePan) return;

    const deltaX = event.clientX - this.lastPointer.x;
    const deltaY = event.clientY - this.lastPointer.y;

    this.pan(deltaX * this.config.panSpeed, deltaY * this.config.panSpeed);

    this.lastPointer = { x: event.clientX, y: event.clientY };
  }

  /**
   * Pointer up handler
   */
  handlePointerUp() {
    this.isDragging = false;
    this.svgElement.style.cursor = 'grab';
  }

  /**
   * Touch start handler
   */
  handleTouchStart(event) {
    event.preventDefault();

    if (event.touches.length === 1 && this.config.touchPan) {
      // Single touch - pan
      this.isDragging = true;
      this.isTouch = true;
      this.lastPointer = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else if (event.touches.length === 2 && this.config.touchZoom) {
      // Two touches - zoom
      this.isDragging = false;
      this.isTouch = true;
      this.touchDistance = this.getTouchDistance(event.touches);
    }
  }

  /**
   * Touch move handler
   */
  handleTouchMove(event) {
    event.preventDefault();

    if (event.touches.length === 1 && this.isDragging && this.config.touchPan) {
      // Single touch pan
      const deltaX = event.touches[0].clientX - this.lastPointer.x;
      const deltaY = event.touches[0].clientY - this.lastPointer.y;

      this.pan(deltaX * this.config.panSpeed, deltaY * this.config.panSpeed);

      this.lastPointer = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else if (event.touches.length === 2 && this.config.touchZoom) {
      // Two touch zoom
      const newDistance = this.getTouchDistance(event.touches);
      const distanceRatio = newDistance / this.touchDistance;

      const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

      const rect = this.svgElement.getBoundingClientRect();
      const pointerX = centerX - rect.left;
      const pointerY = centerY - rect.top;

      const scaleDelta = distanceRatio - 1;
      this.zoomAt(pointerX, pointerY, scaleDelta);

      this.touchDistance = newDistance;
    }
  }

  /**
   * Touch end handler
   */
  handleTouchEnd(event) {
    if (event.touches.length === 0) {
      this.isDragging = false;
      this.isTouch = false;
    }
  }

  /**
   * Calculate distance between two touches
   */
  getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Zoom at specific point
   */
  zoomAt(pointerX, pointerY, scaleDelta) {
    const newScale = Math.max(
      this.config.minZoom,
      Math.min(this.config.maxZoom, this.scale * (1 + scaleDelta)),
    );

    if (newScale === this.scale) return;

    // Calculate zoom center in SVG coordinates
    const rect = this.svgElement.getBoundingClientRect();
    const svgX = (pointerX / rect.width) * this.currentViewBox.width + this.currentViewBox.x;
    const svgY = (pointerY / rect.height) * this.currentViewBox.height + this.currentViewBox.y;

    // Apply zoom
    const scaleRatio = this.scale / newScale;

    this.currentViewBox.width = this.originalViewBox.width * scaleRatio;
    this.currentViewBox.height = this.originalViewBox.height * scaleRatio;

    this.currentViewBox.x = svgX - (svgX - this.currentViewBox.x) * (newScale / this.scale);
    this.currentViewBox.y = svgY - (svgY - this.currentViewBox.y) * (newScale / this.scale);

    this.scale = newScale;
    this.updateTransform();
  }

  /**
   * Pan by delta amounts
   */
  pan(deltaX, deltaY) {
    const rect = this.svgElement.getBoundingClientRect();

    // Convert screen pixels to SVG units
    const svgDeltaX = (deltaX / rect.width) * this.currentViewBox.width;
    const svgDeltaY = (deltaY / rect.height) * this.currentViewBox.height;

    this.currentViewBox.x -= svgDeltaX;
    this.currentViewBox.y -= svgDeltaY;

    this.updateTransform();
  }

  /**
   * Update SVG viewBox
   */
  updateTransform() {
    if (!this.svgElement) return;

    const viewBoxString = [
      this.currentViewBox.x,
      this.currentViewBox.y,
      this.currentViewBox.width,
      this.currentViewBox.height,
    ].join(' ');

    this.svgElement.setAttribute('viewBox', viewBoxString);

    // Emit transform event
    if (typeof window !== 'undefined' && typeof window.CustomEvent !== 'undefined') {
      const event = new window.CustomEvent('transform', {
        detail: {
          scale: this.scale,
          translateX: this.translateX,
          translateY: this.translateY,
          viewBox: this.currentViewBox,
        },
        bubbles: true,
      });
      this.svgElement.dispatchEvent(event);
    }
  }

  /**
   * Reset zoom and pan to original state
   */
  reset() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.currentViewBox = { ...this.originalViewBox };
    this.updateTransform();
  }

  /**
   * Set zoom level programmatically
   */
  setZoom(scale, centerX = null, centerY = null) {
    const newScale = Math.max(
      this.config.minZoom,
      Math.min(this.config.maxZoom, scale),
    );

    if (centerX !== null && centerY !== null) {
      this.zoomAt(centerX, centerY, (newScale / this.scale) - 1);
    } else {
      this.scale = newScale;
      const scaleRatio = 1 / newScale;
      this.currentViewBox.width = this.originalViewBox.width * scaleRatio;
      this.currentViewBox.height = this.originalViewBox.height * scaleRatio;
      this.updateTransform();
    }
  }

  /**
   * Get current transform state
   */
  getTransform() {
    return {
      scale: this.scale,
      translateX: this.translateX,
      translateY: this.translateY,
      viewBox: { ...this.currentViewBox },
    };
  }

  /**
   * Enable/disable zoom functionality
   */
  setZoomEnabled(enabled) {
    this.config.enableZoom = enabled;
  }

  /**
   * Enable/disable pan functionality
   */
  setPanEnabled(enabled) {
    this.config.enablePan = enabled;
  }

  /**
   * Fit content to view
   */
  fitToView(padding = 0.1) {
    this.scale = 1 - padding;
    this.currentViewBox = {
      x: this.originalViewBox.x - (this.originalViewBox.width * padding) / 2,
      y: this.originalViewBox.y - (this.originalViewBox.height * padding) / 2,
      width: this.originalViewBox.width * (1 + padding),
      height: this.originalViewBox.height * (1 + padding),
    };
    this.updateTransform();
  }

  /**
   * Clean up event listeners and resources
   */
  destroy() {
    if (this.svgElement) {
      this.svgElement.removeEventListener('wheel', this.handleWheel);
      this.svgElement.removeEventListener('pointerdown', this.handlePointerDown);
      this.svgElement.removeEventListener('pointermove', this.handlePointerMove);
      this.svgElement.removeEventListener('pointerup', this.handlePointerUp);
      this.svgElement.removeEventListener('touchstart', this.handleTouchStart);
      this.svgElement.removeEventListener('touchmove', this.handleTouchMove);
      this.svgElement.removeEventListener('touchend', this.handleTouchEnd);
    }

    if (this.animationId) {
      if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(this.animationId);
      }
      this.animationId = null;
    }

    this.svgElement = null;
  }
}

// Zoom/Pan presets for different chart types
export const ZoomPanPresets = {
  DEFAULT: {
    enableZoom: true,
    enablePan: true,
    minZoom: 0.1,
    maxZoom: 10,
    zoomSpeed: 0.1,
    panSpeed: 1,
  },

  TIME_SERIES: {
    enableZoom: true,
    enablePan: true,
    minZoom: 0.5,
    maxZoom: 20,
    zoomSpeed: 0.15,
    panSpeed: 0.8,
    wheelZoom: true,
    touchZoom: true,
  },

  DETAILED_VIEW: {
    enableZoom: true,
    enablePan: true,
    minZoom: 1,
    maxZoom: 50,
    zoomSpeed: 0.2,
    panSpeed: 0.6,
  },

  PAN_ONLY: {
    enableZoom: false,
    enablePan: true,
    panSpeed: 1.2,
  },

  ZOOM_ONLY: {
    enableZoom: true,
    enablePan: false,
    minZoom: 0.1,
    maxZoom: 5,
    zoomSpeed: 0.1,
  },
};
