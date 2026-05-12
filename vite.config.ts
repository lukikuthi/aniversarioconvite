import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/aniversarioconvite/",
  },
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        outputPath: "index.html",
      },
    },
  },
});
