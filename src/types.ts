import { Links } from './links';
import BaseRequest from '@curveball/core/dist/base-request';

declare module '@curveball/core' {

  interface Request {

    links: Links;

  }

  interface Response {

    links: Links;

  }

}
