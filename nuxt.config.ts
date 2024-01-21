import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@vee-validate/nuxt",
    "@vite-pwa/nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "PharmaCursor",
      short_name: "PharmaCursor",
      // description: 'Ваш надежный компаньон в профессиональном росте!',
      lang: "ru",
      theme_color: "#1967c0",
      background_color: "#ffffff",
      display: "standalone",
      description:
        "\u0412\u0430\u0448 \u043d\u0430\u0434\u0435\u0436\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u044c\u043e\u043d \u0432 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u043c \u0440\u043e\u0441\u0442\u0435!",
      icons: [
        {
          src: "icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icon-256x256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      navigateFallback: "/",
    },
    client: {
      // installPrompt: true
    },
  },
});
