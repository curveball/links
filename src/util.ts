import { Link, Links } from './links';
import * as LinkHeader from 'http-link-header';
import { HalResource, HalLink } from 'hal-types';

export function parseLinkHeader(headers: string[]): Link[] {

  const links = LinkHeader.parse(headers.join(','));
  const result: Link[] = [];
  for(const link of links.refs) {
    const { uri, ...otherProps } = link;
    result.push({
      href: uri,
      ...otherProps
    });

  }
  return result;

}

export function stringifyLinks(links: Link[] | Links): string[] {

  const out = [];

  const linksIter = links instanceof Links ? links.getAll() : links;

  // Instead of using LinkHeader.toString(), we're replicating their algorithm
  // so we can return an array of Link headers, instead of a single concatenated string.
  for(const link of linksIter) {

    let header = '<' + link.href + '>';
    for(const [key, value] of Object.entries(link)) {
      if (key === 'href') continue;
      header+='; ' + LinkHeader.formatAttribute(key, value);
    }
    out.push(header);
  }

  return out;

}

export function parseHalLinks(halLinksObj: HalResource['_links']): Link[] {

  const result:Link[] = [];

  for(const [rel, halLinks] of Object.entries(halLinksObj)) {

    if (Array.isArray(halLinks)) {
      result.push(
        ...halLinks.map(l => parseHalLink(rel, l) )
      );
    } else {
      result.push(parseHalLink(rel, halLinks));
    }

  }
  return result;

}

function parseHalLink(rel: string, halLink: HalLink): Link {

  return {
    rel,
    ...halLink
  };

}
