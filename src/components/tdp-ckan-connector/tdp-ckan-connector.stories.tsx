import { text, withKnobs, boolean } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';
import { html } from 'lit-html';
import { ckanSiteUrl, knobGroups } from '../../stories/tdp.common';
import readme from './readme.md';


export default {
  title: 'TDP CKAN|Connector',
  component: 'tdp-ckan-connector',
  decorators: [withKnobs, withActions('ready .connector')],
  parameters: {
    notes: {
      markdown: { readme },
    }
  }
};

export const Default = () => html`
  <tdp-ckan-connector
    class="connector"
    site="${text('site', ckanSiteUrl, knobGroups.Properties)}"
    debug="${boolean('debug', true, knobGroups.Properties)}"
  ></tdp-ckan-connector>
`;
