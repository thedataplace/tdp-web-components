import { newE2EPage } from '@stencil/core/testing';

describe('tdp-ckan-listing', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<tdp-ckan-listing></tdp-ckan-listing>');
    const element = await page.find('tdp-ckan-listing');

    expect(element).toHaveClass('hydrated');
  });

});
