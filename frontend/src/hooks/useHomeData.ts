// src/hooks/useHomeData.ts

import { useEffect, useState } from "react";
import httpClient from "@/services/httpClient";

export interface Location {
  name: string;
}
export interface Destination {
  title: string;
  location: string;
  price: string;
  rating: string;
  img: string;
}

export const useHomeData = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locRes, destRes] = await Promise.all([
          httpClient.get("/api/locations"),
          httpClient.get("/api/destinations"),
        ]);
        setLocations(locRes.data);
        setDestinations(destRes.data);
      } catch (e) {
        console.error("Home data fetch error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { locations, destinations, loading };
};
