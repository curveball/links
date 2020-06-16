import { Links } from './links';

declare module '@curveball/core' {

  interface Request<T> {

    links: Links;

  }

  interface Response<T> {

    links: Links;

  }

}
