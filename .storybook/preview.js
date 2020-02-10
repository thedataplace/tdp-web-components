/* global window */

import {
  configure,
  addParameters,
  addDecorator,
  setCustomElements,
} from '@storybook/web-components';

import customElements from '../custom-elements.json';

setCustomElements(customElements);

addParameters({
  docs: {
    iframeHeight: '200px',
  },
});
