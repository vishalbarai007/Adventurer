export declare class LocationRecommender {
    getLocationFromIp(ipAddress: string): Promise<{
        latitude: number;
        longitude: number;
        city: any;
        region: any;
    } | null>;
    getTouristSpots(): Promise<any[]>;
    findNearbySpots(userLocation: {
        latitude: number;
        longitude: number;
    }, maxDistanceKm?: number): Promise<any[]>;
}
//# sourceMappingURL=geo.d.ts.map