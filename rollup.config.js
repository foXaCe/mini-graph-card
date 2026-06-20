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
