import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

export default defineConfig({
	plugins: [
		react(), 
		compression(), 
		visualizer({ open: false })
	],

	server: {
		fs: {
			strict: false, // Allow files outside root
		},
		// Proxy API requests to your local backend during development
		proxy: {
			"/api": {
				target: "http://localhost:5000",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	optimizeDeps: {
		include: ["react", "react-dom"],
	},
	build: {
		sourcemap: false,
		minify: "esbuild",
		target: "esnext",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});