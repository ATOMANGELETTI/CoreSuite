import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const programRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  root: programRoot,
  plugins: [tailwindcss(), svelte()],
  clearScreen: false,
  envPrefix: ["VITE_", "TAURI_ENV_*"],
  optimizeDeps: {
    exclude: ["@coresuite/shell-ui", "@coresuite/shell-bridge"],
  },
  server: {
    port: 5174,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1422,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
    fs: {
      allow: [programRoot, path.resolve(programRoot, "../../packages")],
    },
  },
  build: {
    outDir: path.join(programRoot, "dist"),
    emptyOutDir: true,
    target: process.env.TAURI_ENV_PLATFORM === "windows" ? "chrome105" : "safari13",
    minify: process.env.TAURI_ENV_DEBUG ? false : true,
    sourcemap: Boolean(process.env.TAURI_ENV_DEBUG),
  },
});
