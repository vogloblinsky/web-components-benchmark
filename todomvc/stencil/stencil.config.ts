import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: '/demos/todomvc/stencil/',
      serviceWorker: null // disable service workers
    }
  ]
};
