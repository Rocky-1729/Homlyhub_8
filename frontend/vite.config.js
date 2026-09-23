import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Default to local backend if running locally, or use VITE_BACKEND_URL from .env
  const target = env.VITE_BACKEND_URL || "https://homlyhub-8.onrender.com";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: target,
          changeOrigin: true,
          secure: false,
          timeout: 60000,
        },
      },
    },
  };
});
