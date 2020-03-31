import { Link, Links } from './links';
import LinkHeader from 'http-link-header';

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
  const ref = null;

  const linksIter = links instanceof Links ? links.getAll() : links;

  // Instead of using LinkHeader.toString(), we're replicating their algorithm
  // so we can return an array of Link headers, instead of a single concatenated string.
  for(const link of linksIter) {

    const header = '<' + link.href + '>';
    for(const [key, value] of Object.entries(link)) {
      if (key === 'href') continue;
      // @ts-ignore formatAttribute exists, but it's not in DefinitelyTyped
      header+='; ' + LinkHeader.formatAttribute(key, value);
    }
    out.push(header);
  }

  return out;

}
