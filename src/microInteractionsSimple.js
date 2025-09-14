/**
 * Simplified micro-interactions system compatible with ESLint rules
 */

export class MicroInteractions {
  constructor(element) {
    this.element = element;
    this.activeInteractions = new Set();
    this.feedbackQueue = [];
    this.animationFrameId = null;
  }

  // Simple pulse animation
  createPulse(target, options = {}) {
    const config = {
      duration: 1000,
      intensity: 0.3,
      color: '#03a9f4',
      ...options,
    };

    const pulseId = `pulse-${Date.now()}`;
    this.activeInteractions.add(pulseId);

    const keyframes = [
      {
        boxShadow: `0 0 0 0 ${config.color}80`,
        transform: 'scale(1)',
      },
      {
        boxShadow: `0 0 0 10px ${config.color}00`,
        transform: `scale(${1 + config.intensity})`,
      },
      {
        boxShadow: `0 0 0 0 ${config.color}00`,
        transform: 'scale(1)',
      },
    ];

    const animation = target.animate(keyframes, {
      duration: config.duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      iterations: Infinity,
    });

    return {
      id: pulseId,
      stop() {
        animation.cancel();
      },
    };
  }

  // Loading pulse
  createLoadingPulse(target) {
    return this.createPulse(target, {
      duration: 1500,
      intensity: 0.1,
      color: '#666666',
    });
  }

  // Error shake animation
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

  // Success confirmation
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

  // Chart feedback
  createChartFeedback(action, intensity = 'subtle') {
    const effects = {
      subtle: { scale: 1.02, duration: 200 },
      moderate: { scale: 1.05, duration: 300 },
      strong: { scale: 1.08, duration: 400 },
    };

    const effect = effects[intensity] || effects.subtle;
    const chart = this.element.shadowRoot && this.element.shadowRoot.querySelector('.graph__container__svg');

    if (chart) {
      const element = chart;
      element.style.transition = `transform ${effect.duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      element.style.transform = `scale(${effect.scale})`;

      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, effect.duration);
    }
  }

  // Enhanced hover effects
  enhanceDataPointHover(target, value) {
    const showEffect = () => {
      const element = target;
      element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.transform = 'scale(1.3)';
      element.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';

      // Simple color based on value
      let color = '#03a9f4'; // Default blue
      if (value > 0) color = '#4caf50'; // Green for positive
      if (value < 0) color = '#f44336'; // Red for negative

      element.style.fill = color;
    };

    const hideEffect = () => {
      const element = target;
      element.style.transform = 'scale(1)';
      element.style.filter = '';
      element.style.fill = '';
    };

    return { showEffect, hideEffect };
  }

  // Performance monitoring - simplified
  startPerformanceMonitoring() {
    // Simple monitoring without performance API dependencies
    let lastTime = Date.now();

    const monitor = () => {
      const currentTime = Date.now();

      if (currentTime >= lastTime + 1000) {
        // Reset counters every second
        lastTime = currentTime;
      }

      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        this.animationFrameId = window.requestAnimationFrame(monitor);
      }
    };

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      this.animationFrameId = window.requestAnimationFrame(monitor);
    }
  }

  stopPerformanceMonitoring() {
    if (this.animationFrameId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // Cleanup
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

// Export presets
export const InteractionPresets = {
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
  CRITICAL: 'critical',
  WARNING: 'warning',
  INFO: 'info',
  HOVER: 'hover',
  SELECT: 'select',
  ZOOM: 'zoom',
};

// Utility function
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
