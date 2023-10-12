import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173/vue_report",
    defaultCommandTimeout: 6000,
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
