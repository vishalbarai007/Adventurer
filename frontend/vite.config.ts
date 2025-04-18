import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { visualizer } from 'rollup-plugin-visualizer';
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [react(), compression(), visualizer({ open: true })],
  
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
            if (id.includes("react") || id.includes("react-dom")) {
              return "react";
            }
            if (id.includes("@mui/material")) {
              return "mui";
            }
            if (id.includes("chart.js")) {
              return "chartLibs";
            }
            return "vendor";
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
