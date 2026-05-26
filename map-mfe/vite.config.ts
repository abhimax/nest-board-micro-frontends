import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "map_mfe",
      filename: "remoteEntry.js",
      exposes: {
        "./MapPage": "./src/MapPage.tsx",
      },
      shared: ["react", "react-dom", "react-router", "@tanstack/react-query"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5184,
    strictPort: true,
  },
  preview: {
    port: 5184,
    strictPort: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
