 import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // This base path MUST match the deployment path in your Jenkinsfile.
  // This ensures that all asset links (JS, CSS) in the final build are correct.
  base: "/portfolio_front1/",

  plugins: [
    react(),
    // The component tagger is a useful tool for development.
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  // Restoring the path alias for cleaner imports in your project.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
