import { API_HOST, FE_HOST, FE_PORT_J } from '../../../env';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Eezze FE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: false,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30, // ttl: 2592000 same as file gesdinet_jwt_refresh_token.yaml
        },
        endpoints: {
          login: {
            url: `${API_HOST}/v1/auth/login`,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            propertyName: 'idToken',
            callback: '/'
          },
          register: { url: `${API_HOST}/v1/auth/register`, method: 'post' },
          refresh: { url: `${API_HOST}/v1/auth/token`, method: 'put' },
          user: { url: `${API_HOST}/v1/auth/user`, method: 'get', propertyName: 'data.user', autoFetch: true },
          logout: false,
        },
        autoLogout: true,
      },
      cookie: {
        prefix: 'auth.',
        secure: true,
      },
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/interact.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vite: true
  },

  server: {
    host: FE_HOST,
    port: FE_PORT_J
  }
}