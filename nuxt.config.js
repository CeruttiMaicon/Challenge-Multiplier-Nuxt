require("dotenv").config();

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Challenge-Multiplier-Nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/dotenv"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token"
          },
          logout: {
            url: "/logout",
            method: "post",
            propertyName: "token"
          },
          user: {
            url: "/user",
            method: "get",
            propertyName: false
          }
        },
        tokenRequired: true,
        tokenType: "bearer"
      }
    },
    redirect: {
      login: "/login",
      logout: "/logout",
      user: "/profile",
      callback: "/login"
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.APP_URL
  },

  publicRuntimeConfig: {
    appName: process.env.APP_NAME
  },

  router: {
    middleware: ["auth"]
  },

  server: {
    port: 8000 // default: 3000
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
