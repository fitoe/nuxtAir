// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'

export default defineNuxtConfig({

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    'dayjs-nuxt',
  ],
  ssr: false,
  imports: {
    presets: [
      {
        from: 'alova/client',
        imports: ['useRequest', 'usePagination', 'useForm'],
      },
    ],
  },
  devtools: { enabled: true },
  app: {
    keepalive: true,
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt.js project' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: 'white' },
      ],
    },
  },
  css: ['~/assets/main.css'],
  ui: {
    fonts: false,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      imgHostname: process.env.NUXT_IMG_HOSTNAME,
    },
  },
  routeRules: {
    '/devapi/**': { proxy: `${process.env.NUXT_API_BASE_URL}/**`, cors: true },
  },
  devServer: {
    port: 4000,
    host: '0.0.0.0',
  },
  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    payloadExtraction: true,
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    preset: 'static',
    // prerender: {
    //   crawlLinks: true,
    //   routes: ['/'],
    // },
  },
  vite: {
    vue: {
      script: {
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/element.scss" as element;',
        },
      },
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '#types/*': ['./app/types/*'],
        },
        types: ['./app/types'],
      },
    },
  },
  hooks: {
    'pages:extend': function (pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          if (page.path.indexOf('/user') > 0) {
            page.meta ||= {}
            page.meta.middleware = ['auth']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    },
  },
  // debug: true,
  elementPlus: {
    importStyle: 'scss',
    defaultLocale: 'zh-cn',
  },
  eslint: {
    // checker: {
    //   configType: 'eslintrc'
    // },
    config: {
      // stylistic: true,
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
  icon: {
    serverBundle: {
      collections: ['uil', 'ep', 'lucide'],
    },
    clientBundle: {
      scan: true,
    },
  },
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  server: {
    port: 4000,
    host: '0.0.0.0',
  },
})
