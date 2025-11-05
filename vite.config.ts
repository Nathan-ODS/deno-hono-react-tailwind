import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  root: "client",
  plugins: [
    react({
      babel: {
        plugins: [
          "babel-plugin-react-compiler",
        ],
      },
    }),
    tailwindcss(),
    {
      name: "custom-logger",
      configureServer(server) {
        // Show custom startup message with port
        server.httpServer?.once("listening", () => {
          const address = server.httpServer?.address();
          const port = typeof address === "object" && address
            ? address.port
            : 5173;
          console.log(
            `\x1b[32m✓\x1b[0m Vite is running on http://localhost:${port}`,
          );
        });

        // Suppress proxy errors (aborted requests during HMR)
        const originalError = server.config.logger.error;
        server.config.logger.error = (msg, options) => {
          if (
            typeof msg === "string" &&
            (msg.includes("http proxy error") ||
              msg.includes("AbortError") ||
              msg.includes("The request has been cancelled"))
          ) {
            return; // Suppress these errors
          }
          originalError(msg, options);
        };
      },
    },
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: true,
    },
  },
  logLevel: "warn",
  build: {
    rollupOptions: {
      input: "./client/index.html",
    },
    commonjsOptions: {
      exclude: ["server/**"]
    }
  }
});
