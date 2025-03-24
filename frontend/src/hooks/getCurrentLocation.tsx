import { useState, useEffect } from "react";

type Location = {
	latitude: number;
	longitude: number;
	error?: string;
};

const useCurrentLocation = () => {
	const [location, setLocation] = useState<Location | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError("Geolocation is not supported by your browser.");
			setIsLoading(false);
			return;
		}

		const handleSuccess = (position: GeolocationPosition) => {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
			setIsLoading(false);
		};

		const handleError = (error: GeolocationPositionError) => {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					setError("User denied the request for Geolocation.");
					break;
				case error.POSITION_UNAVAILABLE:
					setError("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					setError("The request to get user location timed out.");
					break;
				default:
					setError("An unknown error occurred.");
			}
			setIsLoading(false);
		};

		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	}, []);

	return { location, isLoading, error };
};

export default useCurrentLocation;
