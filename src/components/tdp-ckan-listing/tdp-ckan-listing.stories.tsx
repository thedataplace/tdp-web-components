import { withKnobs, select, color } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';
import { html } from 'lit-html';
import readme from './readme.md';
import { knobGroups } from '../../stories/tdp.common';

const options = {
  package: 'package',
  organization: 'organization',
  group: 'group'
};

export default {
  title: 'TDP CKAN|Listing',
  component: 'tdp-ckan-listing',
  decorators: [withKnobs, withActions('itemSelected .listing')],
  parameters: {
    notes: {
      markdown: { readme },
    }
  }
};

export const Default = () => html`
  <style>
  tdp-ckan-listing {
    --tdp-ckan-listing__header--color: ${color('Header: colour', 'var(--tdp-primary)', knobGroups.Styling)};
    --tdp-ckan-listing__item--background-color: ${color('Item: background colour', 'var(--tdp-white)', knobGroups.Styling)};
    --tdp-ckan-listing__item--color: ${color('Item: text colour', 'var(--tdp-black)', knobGroups.Styling)};
    --tdp-ckan-listing__item--hover--background-color: ${color('Item: hover background colour', 'var(--tdp-light-grey)', knobGroups.Styling)};
    --tdp-ckan-listing__item--hover--color: ${color('Item: hover text colour', 'var(--tdp-white)', knobGroups.Styling)};
  }
  </style>
  <tdp-ckan-listing class="listing" type="${select('type', options, options.package, knobGroups.Properties)}"></tdp-ckan-listing>
`;
