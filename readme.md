# The Data Place: CKAN Web Components

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

## Hello

This is a set of curated custom web components designed to work against a CKAN instance.

These components are backed by an internal service layer

## Design Goals

- To create a portable, framework-independent, set of curated components that ease the process of consuming a CKAN instance via its API.
- To be flexible enough that a downstream development team can style the components according to their base brand guidelines.
- To prove that consuming and presenting CKAN data outside of the default platform front-end can be easy.

## Using TDP CKAN Components

Framework integrations follow [StencilJS's documentation](https://stenciljs.com/docs/overview) for the most part.

## Getting Started

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone git@github.com:thedataplace/tdp-ckan-web-components.git
cd tdp-ckan-web-components
npm i
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

To view the Storybook for the components, run:

```bash
npm run storybook
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).

## Naming Components

All components should be prefixed with the `tdp-ckan-*`.

## Publishing updates to npm

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)

## Using these components

### Using a CDN

In your document's header, add the following:

```html
<script type="module" src="https://unpkg.com/@thedataplace/ckan-web-components@latest/dist/tdp-ckan-web-components/tdp-ckan-web-components.esm.js" crossorigin></script>
<script nomodule src="https://unpkg.com/@thedataplace/ckan-web-components@latest/dist/tdp-ckan-web-components/tdp-ckan-web-components.js"></script>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@thedataplace/ckan-web-components@latest/dist/tdp-ckan-web-components/tdp-ckan-web-components.css" />
```

Replacing the version number (in the example, `@latest`) with the desired version.

### In a stencil/angular/ionic app

- Run `npm install @thedataplace/ckan-web-components --save`
- Add an import to the npm packages `import @thedataplace/ckan-web-components;`
- Then you can use the element anywhere in your template, JSX, html etc
