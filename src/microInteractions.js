/**
 * Micro-interactions system for enhanced user experience
 * Provides subtle animations, feedback, and contextual responses
 */

export class MicroInteractions {
  constructor(element) {
    this.element = element;
    this.activeInteractions = new Set();
    this.feedbackQueue = [];
    this.animationFrameId = null;
  }

  // Core animation system
  createPulse(target, { duration = 1000, intensity = 0.3, color = '#03a9f4' } = {}) {
    const pulseId = `pulse-${Date.now()}`;
    this.activeInteractions.add(pulseId);

    const keyframes = [
      {
        boxShadow: `0 0 0 0 ${color}80`,
        transform: 'scale(1)',
      },
      {
        boxShadow: `0 0 0 10px ${color}00`,
        transform: `scale(${1 + intensity})`,
      },
      {
        boxShadow: `0 0 0 0 ${color}00`,
        transform: 'scale(1)',
      },
    ];

    const animation = target.animate(keyframes, {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iterations: Infinity,
    });

    return {
      id: pulseId,
      stop: () => {
        animation.cancel();
        this.activeInteractions.delete(pulseId);
      },
    };
  }

  // Data point hover effect
  enhanceDataPointHover(target, value, entityIndex) {
    const showEffect = () => {
      // Scale animation
      target.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      target.style.transform = 'scale(1.3)';
      target.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';

      // Contextual color based on value trend
      const color = this.getContextualColor(value, entityIndex);
      target.style.fill = color;

      // Ripple effect
      this.createRippleEffect(target, color);
    };

    const hideEffect = () => {
      target.style.transform = 'scale(1)';
      target.style.filter = '';
      target.style.fill = '';
    };

    return { showEffect, hideEffect };
  }

  // Contextual feedback based on data trends
  getContextualColor(value, entityIndex) {
    // Get recent values for trend analysis
    const entity = this.element.entity[entityIndex];
    const recentData = (this.element.Graph && this.element.Graph[entityIndex] && this.element.Graph[entityIndex].coords && this.element.Graph[entityIndex].coords.slice(-10)) || [];

    if (recentData.length < 2) return '#03a9f4'; // Default blue

    const trend = this.calculateTrend(recentData);

    if (trend > 0.1) return '#4caf50'; // Green for upward trend
    if (trend < -0.1) return '#f44336'; // Red for downward trend
    return '#ff9800'; // Orange for stable
  }

  calculateTrend(data) {
    if (data.length < 2) return 0;

    const first = data[0][1]; // Y value
    const last = data[data.length - 1][1];

    return (last - first) / first;
  }

  // Loading state micro-interactions
  createLoadingPulse(target) {
    return this.createPulse(target, {
      duration: 1500,
      intensity: 0.1,
      color: '#666666',
    });
  }

  // Error state feedback
  createErrorShake(target) {
    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-3px)' },
      { transform: 'translateX(3px)' },
      { transform: 'translateX(0)' },
    ];

    return target.animate(keyframes, {
      duration: 400,
      easing: 'ease-in-out',
    });
  }

  // Success state confirmation
  createSuccessConfirmation(target) {
    const keyframes = [
      { transform: 'scale(1)', filter: 'brightness(1)' },
      { transform: 'scale(1.1)', filter: 'brightness(1.2)' },
      { transform: 'scale(1)', filter: 'brightness(1)' },
    ];

    return target.animate(keyframes, {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    });
  }

  // Ripple effect for interactions
  createRippleEffect(target, color = '#03a9f4') {
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2;
    const y = rect.height / 2;

    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      background-color: ${color}40;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
    `;

    // Add ripple keyframes if not exists
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    target.style.position = 'relative';
    target.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Chart responsiveness feedback
  createChartFeedback(action, intensity = 'subtle') {
    const effects = {
      subtle: { scale: 1.02, duration: 200 },
      moderate: { scale: 1.05, duration: 300 },
      strong: { scale: 1.08, duration: 400 },
    };

    const effect = effects[intensity] || effects.subtle;
    const chart = this.element.shadowRoot && this.element.shadowRoot.querySelector('.graph__container__svg');

    if (chart) {
      chart.style.transition = `transform ${effect.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      chart.style.transform = `scale(${effect.scale})`;

      setTimeout(() => {
        chart.style.transform = 'scale(1)';
      }, effect.duration);
    }
  }

  // Contextual state indicators
  addStateIndicator(entityIndex, state) {
    const indicators = {
      alert: { color: '#f44336', pulse: true, icon: '⚠️' },
      warning: { color: '#ff9800', pulse: false, icon: '⚡' },
      success: { color: '#4caf50', pulse: false, icon: '✓' },
      info: { color: '#03a9f4', pulse: false, icon: 'ℹ️' },
    };

    const indicator = indicators[state];
    if (!indicator) return;

    // Find entity element and add indicator
    const entityElement = this.element.shadowRoot && this.element.shadowRoot.querySelector(`[data-entity-index="${entityIndex}"]`);
    if (entityElement && indicator.pulse) {
      return this.createPulse(entityElement, {
        color: indicator.color,
        duration: 2000,
      });
    }
  }

  // Performance monitoring for interactions
  startPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    const monitor = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        // Reduce interaction complexity if FPS drops
        if (fps < 30 && this.activeInteractions.size > 0) {
          console.warn('MGC: Reducing micro-interactions for performance');
          this.activeInteractions.forEach((id) => {
            if (id.startsWith('pulse-')) {
              // Stop some pulse animations
            }
          });
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      this.animationFrameId = requestAnimationFrame(monitor);
    };

    monitor();
  }

  stopPerformanceMonitoring() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // Cleanup all active interactions
  cleanup() {
    this.activeInteractions.forEach((interaction) => {
      if (typeof interaction === 'object' && interaction.stop) {
        interaction.stop();
      }
    });
    this.activeInteractions.clear();
    this.stopPerformanceMonitoring();
  }
}

// Interaction presets for common scenarios
export const InteractionPresets = {
  // Data loading states
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',

  // Alert levels
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',

  // Chart interactions
  HOVER: 'hover',
  SELECT: 'select',
  ZOOM: 'zoom',
};

// Utility function to create contextual interactions
export function createContextualInteraction(element, preset, options = {}) {
  const interactions = new MicroInteractions(element);

  switch (preset) {
    case InteractionPresets.LOADING:
      return interactions.createLoadingPulse(element, options);

    case InteractionPresets.ERROR:
      return interactions.createErrorShake(element);

    case InteractionPresets.SUCCESS:
      return interactions.createSuccessConfirmation(element);

    default:
      return interactions.createPulse(element, options);
  }
}
