import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';

// https://github.com/tailwindcss/setup-examples/pull/24/files#diff-f20b1de2196ecdeffaa392b4af09ee4f
const pcss = purgecss({
  content: ['./src/**/*.tsx', './src/index.html'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const postCSSPlugins = [
  autoprefixer(),
  tailwindcss('./tailwind.config.js'),
  pcss,
  ...(process.env.NODE_ENV === 'production' ? [cssnano] : [])
];
// --

export const config: Config = {
  namespace: 'tdp-ckan-web-components',
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
  plugins: [
    sass(),
    postcss({ plugins: postCSSPlugins })
  ],
  globalStyle: 'src/global/tdp.scss',
  excludeSrc: ['/test/', '**/.spec.', '**/__mocks__/**/*.*', '**/.e2e.']
};
