// src/utils/validateEndpoints.ts

import { useEffect } from "react";
import httpClient from "@/services/httpClient";

/**
 * Simple health‑check that runs once when the app starts.
 * It calls the backend `/health` endpoint (or any custom health path)
 * and logs the result. If the request fails, an error is printed to the console
 * so developers can notice mis‑configured URLs during development.
 */
export const useBackendHealthCheck = () => {
  useEffect(() => {
    const ping = async () => {
      try {
        const response = await httpClient.get("/health");
        console.info("✅ Backend health check passed:", response.data);
      } catch (err) {
        console.error("❌ Backend health check failed:", err);
      }
    };
    ping();
  }, []);
};
