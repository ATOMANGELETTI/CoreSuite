import path from "node:path";
import { createServer } from "vite";

const port = 5173;
const configFile = path.resolve("src-tauri/configs/vite.config.ts");

const server = await createServer({
  configFile,
  server: {
    port,
    strictPort: true,
  },
});

await server.listen();
server.printUrls();
