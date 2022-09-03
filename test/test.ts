import { Application, MemoryRequest } from '@curveball/kernel';
import linksMw, { Links } from '../src';
import { expect } from 'chai';
import bodyParser from '@curveball/bodyparser';

/**
 *
 * I was not able to find a reasonable way to extend the core types
 * and have those picked up by Mocha + tsnode.
 *
 * Instead, I'm repeating the definitions here.
 */
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


describe('Links middleware', () => {

  it('should automatically parse links from the Link header', async() => {

    const app = new Application();
    app.use(linksMw());

    let result: null|Links = null;

    app.use( ctx => {

      result = ctx.request.links;

    });

    await app.subRequest('GET', '/', {
      Link: '</foo>;rel="author"',
    });


    expect(result!.get('author')).to.eql({
      href: '/foo',
      rel: 'author',
    });

  });

  it('should automatically build Link headers when set via response.links', async() => {

    const app = new Application();
    app.use(linksMw());

    app.use( ctx => {

      ctx.response.links.set({
        href: '/foo',
        rel: 'author',
      });
      ctx.status = 200;
      ctx.response.body = '';

    });

    const response = await app.subRequest('GET', '/');
    expect(response.status).to.eql(200);

    expect(response.headers.get('Link')).to.eql('</foo>; rel=author');

  });

  it('should automatically parse HAL links', async() => {

    const app = new Application();
    app.use(bodyParser());
    app.use(linksMw());

    let result: null|Links = null;

    app.use( ctx => {

      result = ctx.request.links;

    });

    const request = new MemoryRequest('GET', '/', 'http://localhost', {
      'Content-Type': 'application/json',
    }, {
      _links: {
        author: { href: '/foo'},
        item: [
          { href: '/item/1' },
          { href: '/item/2' },
        ]
      }
    });
    await app.subRequest(request);

    expect(result!.get('author')).to.eql({
      href: '/foo',
      rel: 'author',
    });
    expect(result!.getMany('item')).to.eql([
      {
        href: '/item/1',
        rel: 'item',
      },
      {
        href: '/item/2',
        rel: 'item',
      },
    ]);

  });

  it('should not attempt to parse HAL links if the request body is encoded as a string', async() => {

    const app = new Application();
    app.use(bodyParser());
    app.use(linksMw());

    let result: null|Links = null;

    app.use( ctx => {

      result = ctx.request.links;

    });

    const request = new MemoryRequest('GET', '/', 'http://localhost', {
      'Content-Type': 'text/plain',
    }, 'hi');
    await app.subRequest(request);

    expect(result!.get('author')).to.eql(undefined);
    expect(result!.getMany('item')).to.eql([]);

  });
});

