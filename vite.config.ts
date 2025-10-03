import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Catálogo de Produtos",
        short_name: "Store",
        description: "Um catálogo de produtos PWA.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-android-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-android-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-apple-180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "pwa-apple-58.png",
            sizes: "58x58",
            type: "image/png",
            purpose: "apple touch icon",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.href.includes("fakestoreapi.com/products"),
            handler: "CacheFirst",
            options: {
              cacheName: "api-products-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://fakestoreapi.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
