import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  server: {
    port: 5173,
    proxy: {
      "/users": {
        target: "http://localhost:3333",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        target: "http://localhost:3333",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
