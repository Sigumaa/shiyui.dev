import { rehypeHeadingIds } from '@astrojs/markdown-remark'
// NOTE: 静的サイトとして運用するため、Vercel アダプタは読み込みません。
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Others
// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: 'https://www.shiyui.dev/',
  // Deploy to a sub path; See https://astro-pure.js.org/docs/setup/deployment#platform-with-base-path
  // base: '/astro-pure/',
  trailingSlash: 'never',

  // Adapter
  // https://docs.astro.build/en/guides/deploy/
  // 静的サイトとして出力するため、アダプタは未指定（デフォルトの static 出力）。
  // Vercel 等にデプロイする場合は、必要になった時点で `@astrojs/vercel/static` を導入してください。

  image: {
    responsiveStyles: true,
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    // astro-pure will automatically add sitemap, mdx & unocss
    // sitemap(),
    // mdx(),
    AstroPureIntegration(config)
    // (await import('@playform/compress')).default({
    //   SVG: false,
    //   Exclude: ['index.*.js']
    // }),

    // Temporary fix vercel adapter
    // static build method is not needed
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,
  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },
  experimental: {
    contentIntellisense: true
  },
  vite: {
    plugins: [
      //   visualizer({
      //     emitFile: true,
      //     filename: 'stats.html'
      //   })
    ]
  }
})
