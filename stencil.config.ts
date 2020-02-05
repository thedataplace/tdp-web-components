import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'tdp-web-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [sass()],
  globalStyle: 'src/global/tdp.scss',
  excludeSrc: ['/test/', '**/.spec.', '**/__mocks__/**/*.*', '**/.e2e.']
};
