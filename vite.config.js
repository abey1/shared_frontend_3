import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.VITE_DEV_API_PROXY_TARGET?.trim();

  return {
    plugins: [react()],
    ...(proxyTarget
      ? {
          server: {
            proxy: {
              "/api": {
                target: proxyTarget,
                changeOrigin: true,
                // Nest has no `/api` global prefix (`main.ts`). Strip it so `/api/users/me` → `/users/me`.
                rewrite: (path) => path.replace(/^\/api/, "") || "/",
              },
            },
          },
        }
      : {}),
  };
});
