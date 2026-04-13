import { serve } from "bun";
import { join } from "node:path";

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Default to index.html if path is /
    if (path === "/") path = "/index.html";

    // Build the full file path
    const filePath = join(process.cwd(), path);
    const file = Bun.file(filePath);

    // Check if file exists
    if (await file.exists()) {
      return new Response(file);
    }

    // Return 404 if not found
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
