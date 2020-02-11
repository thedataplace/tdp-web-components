/* global window */

import {
  configure,
  addDecorator,
  setCustomElements,
} from '@storybook/web-components';

import customElements from '../custom-elements.json';

// --

setCustomElements(customElements);

// force full reload to not reregister web components
const req = require.context('../src/components/', true, /\.stories\.(tsx)$/);
configure(req, module);
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    window.location.reload();
  });
}
