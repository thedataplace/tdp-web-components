import { html } from "lit-html";
import readme from './readme.md';

export default {
  title: 'TDP CKAN Dataset',
  component: 'tdp-ckan-dataset',
  parameters: {
    notes: { readme }
  }
};

export const Default = () => html`
  <tdp-ckan-dataset></tdp-ckan-dataset>
`;
