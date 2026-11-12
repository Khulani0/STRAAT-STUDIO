import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { business, hasPlaceholders } from './src/config/business.ts';

// Fails `astro build` while any contact detail is still a placeholder.
// `astro dev` is not affected, so you can still preview.
const placeholderGuard = {
  name: 'placeholder-guard',
  hooks: {
    'astro:build:start': () => {
      if (!hasPlaceholders) return;
      const todo = [];
      if (business.phoneDigits.includes('X')) todo.push('phoneDigits (WhatsApp and phone)');
      if (!business.emailForwardingReady) todo.push('email (set up Cloudflare email forwarding for ' + business.email + ', then set emailForwardingReady to true)');
      if (business.regNumber.startsWith('PLACEHOLDER')) todo.push('regNumber');
      throw new Error(
        'Build stopped: placeholders remain in src/config/business.ts: ' + todo.join(', ') + '.'
      );
    },
  },
};

// @astrojs/sitemap writes sitemap-index.xml and sitemap-0.xml. Also publish the page list as /sitemap.xml,
// which is the address CLAUDE.md, robots.txt and Search Console use.
const sitemapAtRoot = {
  name: 'sitemap-at-root',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await copyFile(fileURLToPath(new URL('sitemap-0.xml', dir)), fileURLToPath(new URL('sitemap.xml', dir)));
    },
  },
};

export default defineConfig({
  site: 'https://straatstudio.co.za',
  output: 'static',
  server: { port: 4322 },
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') }), sitemapAtRoot, placeholderGuard],
  vite: { plugins: [tailwindcss()] },
});
