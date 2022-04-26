import scss from 'rollup-plugin-scss';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/js/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    scss({
      insert: true,
      sourceMap: true,
    }),
    htmlTemplate({
      template: 'src/index.html',
      target: 'index.html',
    }),
    nodeResolve(),
  ],
};