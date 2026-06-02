import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "", // Should add here the production url
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
