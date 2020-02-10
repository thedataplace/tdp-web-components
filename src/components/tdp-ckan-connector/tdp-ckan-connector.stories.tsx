import { withConsole } from '@storybook/addon-console';
import { withKnobs, text } from '@storybook/addon-knobs';
import { html } from "lit-html";
import readme from './readme.md';

const siteUrl = 'https://plymouth.thedata.place';

export default {
  title: 'TDP CKAN Connector',
  component: 'tdp-ckan-connector',
  decorators: [withConsole, withKnobs],
  parameters: {
    notes: { readme }
  }
};

export const Default = () => {
  const site = text('site', siteUrl);

  return html`
    <tdp-ckan-connector site="${site}"></tdp-ckan-connector>
  `;
};
