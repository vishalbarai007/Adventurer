import { useState, useEffect } from "react";
import { Settings, ChevronLeft, PlusSquare } from "lucide-react";
import type { ProfileData } from "../../../../types/posts";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
	isMobile: boolean;
	darkMode: boolean;
	onCreateClick: () => void;
}

interface UserProfile {
	id: string;
	email: string;
	profile_picture?: string;
	name?: string;
}

const ProfileHeader = ({ isMobile, onCreateClick }: ProfileHeaderProps) => {
	const [profileData, setProfileData] = useState<ProfileData>({
		username: "_VishalBarai_",
		fullName: "Vishal Barai",
		bio: [
			"Engineering Student",
			"Fond of chess",
			"Orophile",
			"Web-Developer",
		],
		postsCount: 3,
		followersCount: 148,
		followingCount: 163,
		profilePicture: "/assets/Developers/Vishal.png", // Default fallback
		isVerified: false,
		highlights: [
			{
				id: "1",
				imageUrl: "/assets/Seasons/Winter3.jpg",
				title: "Snowflakes",
			},
			{
				id: "2",
				imageUrl: "/assets/Sports/Trekking.png",
				title: "Trekking",
			},
		],
	});

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/user/profile",
					{
						credentials: "include", // Important for session cookies
					},
				);

				if (response.ok) {
					const userProfile: UserProfile = await response.json();

					// Update profile data with the fetched information
					setProfileData((prev) => ({
						...prev,
						profilePicture:
							userProfile.profile_picture || prev.profilePicture,
						fullName: userProfile.name || prev.fullName,
						username:
							userProfile.email.split("@")[0] || prev.username,
					}));
				}
			} catch (error) {
				console.error("Failed to fetch user profile:", error);
			}
		};

		fetchUserProfile();
	}, []);

	if (isMobile) {
		return (
			<div className="p-4 pt-8 pb-2">
				<div className="flex items-center mb-4">
					<ChevronLeft className="w-6 h-6 mr-2" />
					<h2 className="text-xl font-semibold flex-1">
						{profileData.username}
					</h2>
					<button className="p-1 mr-2" onClick={onCreateClick}>
						<PlusSquare className="w-6 h-6" />
					</button>

					<Link to="/settings">
						<button className="p-1">
							<Settings className="w-6 h-6" />
						</button>
					</Link>
				</div>

				<div className="flex items-center mb-6">
					<div className="mr-6">
						<div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
							<img
								src={
									profileData.profilePicture ||
									"/placeholder.svg"
								}
								alt={profileData.username}
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					<div className="flex justify-between flex-1">
						<div className="text-center">
							<div className="font-semibold">
								{profileData.postsCount}
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Posts
							</div>
						</div>
						<div className="text-center">
							<div className="font-semibold">
								{profileData.followersCount}
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Followers
							</div>
						</div>
						<div className="text-center">
							<div className="font-semibold">
								{profileData.followingCount}
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Following
							</div>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<h1 className="font-semibold">{profileData.fullName}</h1>
					{profileData.bio.map((line, index) => (
						<p key={index} className="text-sm">
							{line}
						</p>
					))}
				</div>

				<div className="flex gap-2 mb-6">
					<button className="flex-1 bg-gray-200 dark:bg-gray-800 py-1.5 rounded-md font-semibold">
						Edit Profile
					</button>
					<button className="flex-1 bg-gray-200 dark:bg-gray-800 py-1.5 rounded-md font-semibold">
						Share Profile
					</button>
				</div>

				<div className="flex overflow-x-auto gap-4 pb-4">
					{profileData.highlights.map((highlight) => (
						<div
							key={highlight.id}
							className="flex flex-col items-center"
						>
							<div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 mb-1">
								<img
									src={
										highlight.imageUrl || "/placeholder.svg"
									}
									alt={highlight.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<span className="text-xs">{highlight.title}</span>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="p-10 border-b-2 border-[#012c18] dark:border-gray-800">
			<div className="flex">
				<div className="mr-12">
					<div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
						<img
							src={
								profileData.profilePicture || "/placeholder.svg"
							}
							alt={profileData.username}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				<div className="flex-1">
					<div className="flex items-center mb-4">
						<h1 className="text-xl font-normal mr-4">
							{profileData.username}
						</h1>
						<Link to="/settings">
							<button className="bg-gray-200 dark:bg-gray-800 px-4 py-1.5 rounded-md font-semibold mr-2">
								Edit profile
							</button>
						</Link>
						<button
							className="bg-gray-200 dark:bg-gray-800 px-4 py-1.5 rounded-md font-semibold mr-2 flex items-center"
							onClick={onCreateClick}
						>
							<PlusSquare className="w-5 h-5 mr-1" />
							Create
						</button>

						<Link to="/settings">
							<button className="p-1">
								<Settings className="w-6 h-6" />
							</button>
						</Link>
					</div>

					<div className="flex mb-4">
						<div className="mr-8">
							<span className="font-semibold">
								{profileData.postsCount}
							</span>{" "}
							posts
						</div>
						<div className="mr-8">
							<span className="font-semibold">
								{profileData.followersCount}
							</span>{" "}
							followers
						</div>
						<div>
							<span className="font-semibold">
								{profileData.followingCount}
							</span>{" "}
							following
						</div>
					</div>

					<div>
						<h2 className="font-semibold">
							{profileData.fullName}
						</h2>
						{profileData.bio.map((line, index) => (
							<p key={index}>{line}</p>
						))}
					</div>
				</div>
			</div>

			<div className="flex mt-8 gap-8">
				{profileData.highlights.map((highlight) => (
					<div
						key={highlight.id}
						className="flex flex-col items-center"
					>
						<div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 mb-1">
							<img
								src={highlight.imageUrl || "/placeholder.svg"}
								alt={highlight.title}
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="text-xs">{highlight.title}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProfileHeader;
