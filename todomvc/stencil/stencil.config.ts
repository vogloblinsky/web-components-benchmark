import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      dir: 'dist',
      serviceWorker: null // disable service workers
    }
  ],
  hashFileNames: false
};
