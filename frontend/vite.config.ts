import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression()],
  server: {
    fs: {
      strict: false, // Allow files outside root
    },
    // Proxy API requests to your Flask backend
    proxy: {
      '/api': {
        target: 'http://localhost:*', // Your Flask server address
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
