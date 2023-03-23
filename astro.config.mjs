import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { SITE_URL } from './src/site_config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv("", process.cwd(), 'STORYBLOK');



// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [tailwind(), sitemap(),
    storyblok({
      accessToken: env.VITE_STORYBLOK_TOKEN,
      components: 
        {
          'page': './src/components/Page.astro',
          'header': './src/components/Header.astro',
          'footer': './src/components/Footer.astro',
          'hero': './src/components/Hero.astro',
          'text': './src/components/Text.astro',
          'image': './src/components/Image.astro',
          'button': './src/components/Button.astro',
          'form': './src/components/Form.astro',
          'input': './src/components/Input.astro',
          'select': './src/components/Select.astro',
          'textarea': './src/components/Textarea.astro',
          'checkbox': './src/components/Checkbox.astro',
          'radio': './src/components/Radio.astro',
          'grid': './src/components/Grid.astro',
          'column': './src/components/Column.astro',
          'card': './src/components/Card.astro',
          'card-image': './src/components/CardImage.astro',
          'card-text': './src/components/CardText.astro',
          'card-button': './src/components/CardButton.astro',
          'card-link': './src/components/CardLink.astro',
          'card-header': './src/components/CardHeader.astro',
          'card-footer': './src/components/CardFooter.astro',
          'card-body': './src/components/CardBody.astro',
          'card-title': './src/components/CardTitle.astro',
          'card-subtitle': './src/components/CardSubtitle.astro',
    },
    apiOptions: {
      // Choose your Storyblok space region
      region: 'us', // optional,  or 'eu' (default)
    },
  })
],

vite: {
  plugins: [rawFonts(['.ttf'])],
  optimizeDeps: { exclude: ['@resvg/resvg-js'] }
},
});

function rawFonts(ext) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}
