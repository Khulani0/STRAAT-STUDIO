// Cloudflare Pages Function. One public address: straatstudio.co.za.
// Only two hosts are redirected (301, same path and query string). Every other host passes through unchanged.

const REDIRECT_HOSTS = new Set(['straat-studio.pages.dev', 'www.straatstudio.co.za']);
const TARGET = 'https://straatstudio.co.za';

interface Context {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: Context): Promise<Response> => {
  const url = new URL(context.request.url);
  if (REDIRECT_HOSTS.has(url.hostname)) {
    return Response.redirect(TARGET + url.pathname + url.search, 301);
  }
  return context.next();
};
