import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  brandTitle: 'The Data Place',
  brandUrl: 'https://thedata.place',
  brandImage: 'assets/images/logo_tdp.png',

  colorPrimary: '#1966b8', // --primary
  colorSecondary: '#19c0b8', // --active

  textColor: '#000A12', // --black
  textInverseColor: '#FFF', // --white

  fontBase: 'rubik, ibm-plex-serif, sans-serif',
});
