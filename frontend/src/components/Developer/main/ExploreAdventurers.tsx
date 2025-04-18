import React, { useState, useEffect } from "react";
// import ExploreData from "../../JSON/ExplorePlaces.json";

// type Explore = {
// 	name: string;
// 	imgSrc: string;
// 	desc: string;
// };

type TouristSpot = {
	id: string;
	name: string;
	latitude: number;
	longitude: number;
	description: string;
	rating: number;
	distance: number;
};

const ExplorePlaces: React.FC = () => {
	// const [selectedImage, setSelectedImage] = useState<number | null>(null);
	const [nearbySpots, setNearbySpots] = useState<TouristSpot[]>([]);
	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [locationStatus, setLocationStatus] = useState<string>("idle"); // Add status state

	// const handleImageClick = (index: number) => {
	// 	setSelectedImage(index === selectedImage ? null : index);
	// };

	const fetchNearbySpots = async (latitude: number, longitude: number) => {
		try {
			setLocationStatus("loading");

			const response = await fetch("/api/nearby-spots", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					coordinates: { latitude, longitude },
					maxDistance: 20, // Default 20km
				}),
				credentials: "include", // Include credentials for session cookies
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error || "Failed to fetch nearby spots",
				);
			}

			const data = await response.json();
			setNearbySpots(data.spots);
			setLocationStatus("success");
		} catch (error) {
			console.error("Error fetching nearby spots:", error);
			setLocationStatus("error");
		}
	};

	const getUserLocation = () => {
		setLocationStatus("requesting");

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation({ latitude, longitude });
					fetchNearbySpots(latitude, longitude);
				},
				(error) => {
					console.error("Error getting user location:", error);
					setLocationStatus("denied");

					// Try IP-based fallback by sending request without coordinates
					fallbackToIPLocation();
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 60000,
				},
			);
		} else {
			setLocationStatus("unsupported");
			fallbackToIPLocation();
		}
	};

	const fallbackToIPLocation = async () => {
		try {
			setLocationStatus("loading");
			// Send request without coordinates to trigger IP-based location on backend
			const response = await fetch("/api/nearby-spots", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					maxDistance: 20,
				}),
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Failed to get location from IP");
			}

			const data = await response.json();
			if (data.user_location) {
				setUserLocation(data.user_location);
			}
			setNearbySpots(data.spots);
			setLocationStatus("success");
		} catch (error) {
			console.error("IP location fallback failed:", error);
			setLocationStatus("error");
		}
	};

	// Location request button handler
	const handleRequestLocation = () => {
		getUserLocation();
	};

	useEffect(() => {
		// Don't auto-request on load to avoid permission dialogs
		// Let user trigger it by button instead
	}, []);

	return (
		<div className="ExplorePlaces bg-[#EADED0] min-h-screen">
			<section
				className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-[10vw] text-black"
				id="explore-section"
			>
				<h1
					className="text-3xl sm:text-4xl md:text-5xl font-light text-center capitalize"
					data-aos="fade-up"
				>
					Explore Adventurous Sports
				</h1>

				{/* Location request section */}
				<div className="w-full max-w-md mx-auto mt-8 bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-xl font-semibold mb-2">
						Find nearby adventures
					</h3>
					<p className="mb-4 text-sm">
						Allow location access to discover tourist spots and
						adventure activities near you.
					</p>

					{locationStatus === "idle" ||
					locationStatus === "denied" ||
					locationStatus === "unsupported" ? (
						<button
							onClick={handleRequestLocation}
							className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
						>
							{locationStatus === "denied"
								? "Try Again"
								: "Share My Location"}
						</button>
					) : locationStatus === "requesting" ? (
						<p className="text-blue-600">
							Requesting location access...
						</p>
					) : locationStatus === "loading" ? (
						<p className="text-blue-600">Finding nearby spots...</p>
					) : locationStatus === "error" ? (
						<div>
							<p className="text-red-600 mb-2">
								Unable to find nearby locations.
							</p>
							<button
								onClick={handleRequestLocation}
								className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
							>
								Try Again
							</button>
						</div>
					) : null}

					{locationStatus === "denied" && (
						<p className="mt-2 text-sm text-red-600">
							Location access was denied. Please enable location
							services in your browser settings.
						</p>
					)}
				</div>

				{/* Display user location if available */}
				{userLocation && (
					<div className="mt-4 text-center">
						<p className="text-sm text-gray-600">
							Your location: {userLocation.latitude.toFixed(4)},{" "}
							{userLocation.longitude.toFixed(4)}
						</p>
					</div>
				)}

				{/* Your existing explore content */}
				<div className="relative w-full mt-8 sm:mt-12 md:mt-16 lg:mt-24">
					{/* Your existing grid of exploring options */}
					{/* ... */}
				</div>

				{/* Display Nearby Spots */}
				<div className="mt-8">
					<h2 className="text-2xl font-bold mb-4">
						{nearbySpots.length > 0 ? "Nearby Tourist Spots" : ""}
					</h2>
					{locationStatus === "success" && nearbySpots.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{nearbySpots.map((spot) => (
								<div
									key={spot.id}
									className="bg-white p-4 rounded-lg shadow-md"
								>
									<h3 className="text-xl font-semibold">
										{spot.name}
									</h3>
									<p className="text-sm text-gray-600">
										{spot.description}
									</p>
									<p className="text-sm text-gray-500">
										Distance: {spot.distance} km
									</p>
								</div>
							))}
						</div>
					) : locationStatus === "success" &&
					  nearbySpots.length === 0 ? (
						<p>No nearby spots found in your area.</p>
					) : null}
				</div>
			</section>
		</div>
	);
};

export default ExplorePlaces;
