// vite.config.ts
import path from "path";
import react from "file:///C:/Users/Yug%20Chapherkar/Adventure-vishal/Adventurer/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import { defineConfig } from "file:///C:/Users/Yug%20Chapherkar/Adventure-vishal/Adventurer/frontend/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///C:/Users/Yug%20Chapherkar/Adventure-vishal/Adventurer/frontend/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import compression from "file:///C:/Users/Yug%20Chapherkar/Adventure-vishal/Adventurer/frontend/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Yug Chapherkar\\Adventure-vishal\\Adventurer\\frontend";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    compression(),
    visualizer({ open: false })
  ],
  server: {
    fs: {
      strict: false
      // Allow files outside root
    },
    // Proxy API requests to your local backend during development
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    include: ["react", "react-dom"]
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    target: "esnext"
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxZdWcgQ2hhcGhlcmthclxcXFxBZHZlbnR1cmUtdmlzaGFsXFxcXEFkdmVudHVyZXJcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFl1ZyBDaGFwaGVya2FyXFxcXEFkdmVudHVyZS12aXNoYWxcXFxcQWR2ZW50dXJlclxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvWXVnJTIwQ2hhcGhlcmthci9BZHZlbnR1cmUtdmlzaGFsL0FkdmVudHVyZXIvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtcblx0XHRyZWFjdCgpLCBcblx0XHRjb21wcmVzc2lvbigpLCBcblx0XHR2aXN1YWxpemVyKHsgb3BlbjogZmFsc2UgfSlcblx0XSxcblxuXHRzZXJ2ZXI6IHtcblx0XHRmczoge1xuXHRcdFx0c3RyaWN0OiBmYWxzZSwgLy8gQWxsb3cgZmlsZXMgb3V0c2lkZSByb290XG5cdFx0fSxcblx0XHQvLyBQcm94eSBBUEkgcmVxdWVzdHMgdG8geW91ciBsb2NhbCBiYWNrZW5kIGR1cmluZyBkZXZlbG9wbWVudFxuXHRcdHByb3h5OiB7XG5cdFx0XHRcIi9hcGlcIjoge1xuXHRcdFx0XHR0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwXCIsXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcblx0XHRcdFx0c2VjdXJlOiBmYWxzZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcblx0b3B0aW1pemVEZXBzOiB7XG5cdFx0aW5jbHVkZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIl0sXG5cdH0sXG5cdGJ1aWxkOiB7XG5cdFx0c291cmNlbWFwOiBmYWxzZSxcblx0XHRtaW5pZnk6IFwiZXNidWlsZFwiLFxuXHRcdHRhcmdldDogXCJlc25leHRcIixcblx0fSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHRcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcblx0XHR9LFxuXHR9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWCxPQUFPLFVBQVU7QUFDclksT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8saUJBQWlCO0FBSnhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLFdBQVcsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUFBLEVBQzNCO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDUCxJQUFJO0FBQUEsTUFDSCxRQUFRO0FBQUE7QUFBQSxJQUNUO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxNQUNUO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNiLFNBQVMsQ0FBQyxTQUFTLFdBQVc7QUFBQSxFQUMvQjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ04sV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNyQztBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
