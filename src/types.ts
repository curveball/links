import { Links } from './links';

declare module '@curveball/core' {

  interface Request {

    links: Links;

  }

  interface Response {

    links: Links;

  }

}
