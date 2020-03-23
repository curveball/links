import { Middleware, Context } from '@curveball/core';
import { Links } from './links';
import { parseLinkHeader, stringifyLinks } from './util';

export default function(): Middleware {

  return async (ctx: Context, next: () => void) => {

    const linkHeader = ctx.request.headers.get('Link');

    ctx.request.links = new Links(linkHeader ? parseLinkHeader([linkHeader]) : []);
    ctx.response.links = new Links();
    await next();

    if (ctx.response.links.size > 0) {
      ctx.response.headers.append('Link', stringifyLinks(ctx.response.links));
    }

  }

}
