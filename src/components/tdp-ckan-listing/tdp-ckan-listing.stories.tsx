import { html } from "lit-html";
import readme from './readme.md';

export default {
  title: 'TDP CKAN Listing',
  component: 'tdp-ckan-listing',
  parameters: {
    notes: { readme }
  }
};

export const Default = () => html`
  <tdp-ckan-listing></tdp-ckan-listing>
`;
