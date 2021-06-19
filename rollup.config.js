import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import progress from 'rollup-plugin-progress';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'LivodMonaco',
      sourcemap: false,
    },
  ],
  plugins: [

    // Locate modules using the Node resolution algorithm,
    // for using third party modules in node_modules
    resolve({
      moduleDirectories: ['node_modules'],
    }),

    // Automatically externalize peerDependencies in a rollup bundle.
    external(),
    commonjs({ include: /\/node_modules\// }),

    // minifies es bundles
    terser({
      output: {
        comments: false
      }
    }),

    // Progress while building
    progress({ clearLine: false }),
  ],
};
