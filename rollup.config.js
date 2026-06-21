import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const dev = process.env.ROLLUP_WATCH;

// Single bundle: src/main.ts already imports the visual editor
// (./editor/editor), so the card and its editor ship together in one file
// that registers both `mini-graph-card` and `mini-graph-card-editor`.
export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/mini-graph-card-bundle.js',
    format: 'es',
    sourcemap: dev ? 'inline' : false,
  },
  // Silence benign warnings that originate entirely from third-party deps
  // (@formatjs `this`-rewrite, d3-interpolate internal cycles). Anything from
  // our own src/ still surfaces normally.
  onwarn(warning, warn) {
    const benign = warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY';
    const files = [warning.id, ...(warning.ids ?? []), ...(warning.cycle ?? [])].filter(Boolean);
    if (benign && files.length > 0 && files.every(f => f.includes('node_modules'))) return;
    warn(warning);
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      include: ['src/**/*.ts'],
      exclude: ['tests/**', '**/*.test.ts'],
    }),
    resolve({ extensions: ['.ts', '.mjs', '.js', '.json'] }),
    commonjs(),
    json({
      include: ['package.json', 'src/translations/*.json'],
      preferConst: true,
    }),
    !dev
      && terser({
        ecma: 2022,
        module: true,
        compress: { passes: 2 },
        format: { comments: false },
      }),
  ].filter(Boolean),
};
