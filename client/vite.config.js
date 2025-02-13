import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://prodigyapp-1.onrender.com", // Vercel backend URL
        changeOrigin: true,
      },
    },
  },

  build: {
    rollupOptions: {
      external: [],
    },
  },
});
