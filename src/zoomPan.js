/**
 * Interactive zoom and pan functionality for mini-graph-card
 * Supports touch gestures, mouse wheel, and drag interactions
 */

export class ZoomPanController {
  constructor(element, config = {}) {
    this.element = element;
    this.config = {
      enableZoom: true,
      enablePan: true,
      minZoom: 0.5,
      maxZoom: 10,
      zoomSensitivity: 0.1,
      panSensitivity: 1,
      resetOnDoubleClick: true,
      showZoomControls: true,
      ...config
    };

    this.state = {
      zoom: 1,
      panX: 0,
      panY: 0,
      isDragging: false,
      lastTouchDistance: 0,
      lastMousePos: { x: 0, y: 0 }
    };

    this.originalViewBox = null;
    this.svgElement = null;
    this.boundingRect = null;

    this.init();
  }

  init() {
    this.findSvgElement();
    this.attachEventListeners();
    this.createControls();
    this.updateViewBox();
  }

  findSvgElement() {
    this.svgElement = (this.element.shadowRoot && this.element.shadowRoot.querySelector('svg')) ||
                      this.element.querySelector('svg');

    if (this.svgElement) {
      // Store original viewBox
      const viewBox = this.svgElement.getAttribute('viewBox');
      this.originalViewBox = viewBox ? viewBox.split(' ').map(Number) : [0, 0, 500, 100];
      this.boundingRect = this.svgElement.getBoundingClientRect();
    }
  }

  attachEventListeners() {
    if (!this.svgElement) return;

    // Mouse events
    if (this.config.enableZoom) {
      this.svgElement.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }

    if (this.config.enablePan) {
      this.svgElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    // Touch events for mobile
    if (this.config.enableZoom || this.config.enablePan) {
      this.svgElement.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
      this.svgElement.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
      this.svgElement.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }

    // Double click reset
    if (this.config.resetOnDoubleClick) {
      this.svgElement.addEventListener('dblclick', this.resetView.bind(this));
    }

    // Prevent context menu on long press
    this.svgElement.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // Mouse wheel zoom
  handleWheel(event) {
    if (!this.config.enableZoom) return;

    event.preventDefault();

    const rect = this.svgElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const delta = -event.deltaY * this.config.zoomSensitivity * 0.01;
    this.zoomAt(mouseX, mouseY, delta);
  }

  // Mouse drag pan
  handleMouseDown(event) {
    if (!this.config.enablePan) return;

    this.state.isDragging = true;
    this.state.lastMousePos = { x: event.clientX, y: event.clientY };
    this.svgElement.style.cursor = 'grabbing';

    event.preventDefault();
  }

  handleMouseMove(event) {
    if (!this.state.isDragging || !this.config.enablePan) return;

    const deltaX = event.clientX - this.state.lastMousePos.x;
    const deltaY = event.clientY - this.state.lastMousePos.y;

    this.pan(deltaX * this.config.panSensitivity, deltaY * this.config.panSensitivity);

    this.state.lastMousePos = { x: event.clientX, y: event.clientY };
  }

  handleMouseUp() {
    if (this.state.isDragging) {
      this.state.isDragging = false;
      this.svgElement.style.cursor = 'grab';
    }
  }

  // Touch events for mobile zoom and pan
  handleTouchStart(event) {
    if (event.touches.length === 1 && this.config.enablePan) {
      // Single touch - start panning
      this.state.isDragging = true;
      this.state.lastMousePos = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else if (event.touches.length === 2 && this.config.enableZoom) {
      // Two touches - start zooming
      this.state.lastTouchDistance = this.getTouchDistance(event.touches[0], event.touches[1]);
    }

    event.preventDefault();
  }

  handleTouchMove(event) {
    if (event.touches.length === 1 && this.state.isDragging && this.config.enablePan) {
      // Single touch pan
      const deltaX = event.touches[0].clientX - this.state.lastMousePos.x;
      const deltaY = event.touches[0].clientY - this.state.lastMousePos.y;

      this.pan(deltaX * this.config.panSensitivity, deltaY * this.config.panSensitivity);

      this.state.lastMousePos = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    } else if (event.touches.length === 2 && this.config.enableZoom) {
      // Pinch zoom
      const currentDistance = this.getTouchDistance(event.touches[0], event.touches[1]);
      const deltaDistance = currentDistance - this.state.lastTouchDistance;

      if (Math.abs(deltaDistance) > 5) { // Threshold to prevent jitter
        const rect = this.svgElement.getBoundingClientRect();
        const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2 - rect.left;
        const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2 - rect.top;

        const zoomFactor = deltaDistance * 0.01;
        this.zoomAt(centerX, centerY, zoomFactor);

        this.state.lastTouchDistance = currentDistance;
      }
    }

    event.preventDefault();
  }

  handleTouchEnd(event) {
    if (event.touches.length === 0) {
      this.state.isDragging = false;
    }

    if (event.touches.length < 2) {
      this.state.lastTouchDistance = 0;
    }
  }

  getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Core zoom functionality
  zoomAt(x, y, delta) {
    const oldZoom = this.state.zoom;
    this.state.zoom = Math.max(
      this.config.minZoom,
      Math.min(this.config.maxZoom, this.state.zoom + delta)
    );

    if (this.state.zoom !== oldZoom) {
      // Adjust pan to zoom at the mouse/touch position
      const rect = this.svgElement.getBoundingClientRect();
      const relativeX = (x / rect.width - 0.5);
      const relativeY = (y / rect.height - 0.5);

      const zoomChange = this.state.zoom - oldZoom;
      this.state.panX -= relativeX * this.originalViewBox[2] * zoomChange;
      this.state.panY -= relativeY * this.originalViewBox[3] * zoomChange;

      this.updateViewBox();
      this.emitZoomChange();
    }
  }

  // Core pan functionality
  pan(deltaX, deltaY) {
    const rect = this.svgElement.getBoundingClientRect();

    // Convert screen pixels to SVG coordinates
    const scaleX = this.originalViewBox[2] / rect.width;
    const scaleY = this.originalViewBox[3] / rect.height;

    this.state.panX -= deltaX * scaleX / this.state.zoom;
    this.state.panY -= deltaY * scaleY / this.state.zoom;

    // Constrain panning to reasonable bounds
    this.constrainPan();
    this.updateViewBox();
    this.emitPanChange();
  }

  constrainPan() {
    const maxPanX = this.originalViewBox[2] * (this.state.zoom - 1) / 2;
    const maxPanY = this.originalViewBox[3] * (this.state.zoom - 1) / 2;

    this.state.panX = Math.max(-maxPanX, Math.min(maxPanX, this.state.panX));
    this.state.panY = Math.max(-maxPanY, Math.min(maxPanY, this.state.panY));
  }

  // Update SVG viewBox based on current zoom and pan
  updateViewBox() {
    if (!this.svgElement || !this.originalViewBox) return;

    const [origX, origY, origWidth, origHeight] = this.originalViewBox;

    const newWidth = origWidth / this.state.zoom;
    const newHeight = origHeight / this.state.zoom;
    const newX = origX + (origWidth - newWidth) / 2 + this.state.panX;
    const newY = origY + (origHeight - newHeight) / 2 + this.state.panY;

    this.svgElement.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
    this.updateControls();
  }

  // Reset to original view
  resetView() {
    this.state.zoom = 1;
    this.state.panX = 0;
    this.state.panY = 0;

    this.updateViewBox();
    this.emitReset();

    // Add visual feedback
    this.svgElement.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      this.svgElement.style.transition = '';
    }, 300);
  }

  // Create zoom/pan controls
  createControls() {
    if (!this.config.showZoomControls) return;

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'zoom-pan-controls';
    controlsContainer.innerHTML = `
      <div class="zoom-controls">
        <button class="zoom-btn zoom-in" title="Zoom In">+</button>
        <button class="zoom-btn zoom-out" title="Zoom Out">−</button>
        <button class="zoom-btn zoom-reset" title="Reset View">⌂</button>
      </div>
      <div class="zoom-level">${Math.round(this.state.zoom * 100)}%</div>
    `;

    // Style controls
    const style = document.createElement('style');
    style.textContent = `
      .zoom-pan-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: var(--paper-font-body1_-_font-family);
      }

      .zoom-controls {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .zoom-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .zoom-btn:hover {
        background: var(--secondary-background-color);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }

      .zoom-btn:active {
        transform: translateY(0);
      }

      .zoom-level {
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
        background: var(--card-background-color, white);
        padding: 4px 8px;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      }
    `;

    // Insert controls and styles
    const cardElement = (this.element.shadowRoot && this.element.shadowRoot.querySelector('ha-card')) ||
                        this.element.querySelector('ha-card');

    if (cardElement) {
      cardElement.style.position = 'relative';
      cardElement.appendChild(controlsContainer);

      if (!document.getElementById('zoom-pan-styles')) {
        style.id = 'zoom-pan-styles';
        document.head.appendChild(style);
      }

      // Attach control events
      controlsContainer.querySelector('.zoom-in').addEventListener('click', () => {
        this.zoomAt(this.boundingRect.width / 2, this.boundingRect.height / 2, 0.2);
      });

      controlsContainer.querySelector('.zoom-out').addEventListener('click', () => {
        this.zoomAt(this.boundingRect.width / 2, this.boundingRect.height / 2, -0.2);
      });

      controlsContainer.querySelector('.zoom-reset').addEventListener('click', () => {
        this.resetView();
      });

      this.controlsContainer = controlsContainer;
    }
  }

  updateControls() {
    if (this.controlsContainer) {
      const zoomLevel = this.controlsContainer.querySelector('.zoom-level');
      if (zoomLevel) {
        zoomLevel.textContent = `${Math.round(this.state.zoom * 100)}%`;
      }
    }
  }

  // Event emission for integration with parent component
  emitZoomChange() {
    this.element.dispatchEvent(new CustomEvent('zoom-changed', {
      detail: { zoom: this.state.zoom }
    }));
  }

  emitPanChange() {
    this.element.dispatchEvent(new CustomEvent('pan-changed', {
      detail: { panX: this.state.panX, panY: this.state.panY }
    }));
  }

  emitReset() {
    this.element.dispatchEvent(new CustomEvent('view-reset', {
      detail: { zoom: 1, panX: 0, panY: 0 }
    }));
  }

  // Public API
  getState() {
    return { ...this.state };
  }

  setZoom(zoom, centerX = null, centerY = null) {
    const x = centerX ?? this.boundingRect.width / 2;
    const y = centerY ?? this.boundingRect.height / 2;
    const delta = zoom - this.state.zoom;
    this.zoomAt(x, y, delta);
  }

  setPan(panX, panY) {
    this.state.panX = panX;
    this.state.panY = panY;
    this.constrainPan();
    this.updateViewBox();
  }

  // Cleanup
  destroy() {
    if (this.controlsContainer) {
      this.controlsContainer.remove();
    }

    // Remove event listeners
    if (this.svgElement) {
      this.svgElement.removeEventListener('wheel', this.handleWheel);
      this.svgElement.removeEventListener('mousedown', this.handleMouseDown);
      this.svgElement.removeEventListener('touchstart', this.handleTouchStart);
      this.svgElement.removeEventListener('touchmove', this.handleTouchMove);
      this.svgElement.removeEventListener('touchend', this.handleTouchEnd);
      this.svgElement.removeEventListener('dblclick', this.resetView);
    }

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
}