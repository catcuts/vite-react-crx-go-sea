import colorLog from '../log';
import { build } from 'vite'; 
import { resolve } from 'path';
import { outputFolderName } from '../constants';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const packages = [
  {
    content:  resolve(__dirname, '../../', 'src/pages/content/index.jsx')
  },
];

const outDir = resolve(__dirname, '../../',  outputFolderName); 

export default function buildContentScript() {
  return {
    name: 'build-content',
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          plugins: [ cssInjectedByJsPlugin() ],
          build: {
            outDir,
            sourcemap: process.env.__DEV__ === 'true',
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: (chunk) => {
                  return `src/pages/${chunk.name}/index.js`;
                },
              },
            },
          },
          configFile: false,
        });
      }
      colorLog('Content code build sucessfully', 'success');
    },
  };
}
