import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';

import { html } from 'lit-html';
import readme from './readme.md';

const siteUrl = 'https://plymouth.thedata.place';

export default {
  title: 'TDP CKAN Connector',
  component: 'tdp-ckan-connector',
  decorators: [withKnobs, withActions('ready .connector')],
  parameters: {
    notes: {
      markdown: { readme },
    }
  }
};

export const Default = () => html`
  <tdp-ckan-connector class="connector" site="${text('site', siteUrl)}" debug="${boolean('debug', true)}"></tdp-ckan-connector>
`;
