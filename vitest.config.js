import { defineConfig } from 'vitest/config';

// Pure-logic suites run in Node (fast); LitElement component suites opt into
// jsdom per file via a `// @vitest-environment jsdom` docblock (card/editor/
// compute/dataSource/handleClick), so they get a DOM + customElements registry.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: ['src/translations/**'],
      reporter: ['text', 'html'],
    },
  },
});
