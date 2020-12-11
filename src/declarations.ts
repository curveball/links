import { Links } from './links';

declare module '@curveball/core' {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Request<T> {

    links: Links;

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Response<T> {

    links: Links;

  }

}
