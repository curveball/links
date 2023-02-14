import { Links } from './links.js';

declare module '@curveball/kernel' {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Request<T> {

    links: Links;

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Response<T> {

    links: Links;

  }

}
