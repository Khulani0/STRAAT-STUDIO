import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
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
      if (business.email.endsWith('.invalid')) todo.push('email');
      if (business.regNumber.startsWith('PLACEHOLDER')) todo.push('regNumber');
      throw new Error(
        'Build stopped: placeholders remain in src/config/business.ts: ' + todo.join(', ') + '.'
      );
    },
  },
};

export default defineConfig({
  site: 'https://straatstudio.co.za',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap(), placeholderGuard],
  vite: { plugins: [tailwindcss()] },
});
