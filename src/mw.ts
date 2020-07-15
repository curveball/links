import { Middleware, Context } from '@curveball/core';
import { Links } from './links';
import { parseLinkHeader, stringifyLinks, parseHalLinks } from './util';

export default function(): Middleware {

  return async (ctx: Context, next: () => void) => {

    const linkHeader = ctx.request.headers.get('Link');

    ctx.request.links = new Links(linkHeader ? parseLinkHeader([linkHeader]) : []);

    if (ctx.request.body && '_links' in ctx.request.body) {
      for(const halLink of parseHalLinks(ctx.request.body._links)) {
        ctx.request.links.add(halLink);
      }
    }

    ctx.response.links = new Links();
    await next();

    if (ctx.response.links.size > 0) {
      ctx.response.headers.append('Link', stringifyLinks(ctx.response.links));
    }

  };

}
