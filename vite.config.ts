import path from "node:path";
import { copyFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// SPA fallback for static hosts without rewrite rules (e.g. GitHub Pages):
// serving dist/404.html = index.html lets deep links like /projects/cosy-aura load.
function spaFallback(): Plugin {
  return {
    name: "spa-404-fallback",
    apply: "build",
    closeBundle() {
      copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
