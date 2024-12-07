// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Config } from './config.interface';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    product: 'https://7lmc12y3y4.execute-api.us-east-1.amazonaws.com/dev',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://4z4bb2qp78.execute-api.us-east-1.amazonaws.com/dev',
    bff: 'https://7lmc12y3y4.execute-api.us-east-1.amazonaws.com/dev',
    cart: 'https://afbzyouqoa.execute-api.us-east-1.amazonaws.com/dev/api/profile',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
  user: {
    username: 'ANASTASIIASHEVCHENKO1',
    password: 'TEST_PASSWORD',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
