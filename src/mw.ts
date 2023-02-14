import { Middleware, Context } from '@curveball/kernel';
import { Links } from './links.js';
import { parseLinkHeader, stringifyLinks, parseHalLinks } from './util.js';

export default function(): Middleware {

  return async (ctx: Context, next: () => void) => {

    const linkHeader = ctx.request.headers.get('Link');

    ctx.request.links = new Links(linkHeader ? parseLinkHeader([linkHeader]) : []);

    if (ctx.request.body && typeof ctx.request.body === 'object' && (ctx.request.body as any)._links !== undefined) {
      for(const halLink of parseHalLinks((ctx.request.body as any)._links)) {
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
