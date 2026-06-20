import { defineConfig } from 'vitest/config';

// Pure-logic suites run in Node (fast); LitElement component suites opt into
// jsdom via environmentMatchGlobs so they get a DOM + customElements registry.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    environment: 'node',
    environmentMatchGlobs: [
      ['tests/card.test.js', 'jsdom'],
      ['tests/editor.test.js', 'jsdom'],
    ],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/translations/**'],
      reporter: ['text', 'html'],
    },
  },
});
