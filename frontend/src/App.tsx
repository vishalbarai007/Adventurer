import "./App.css";
import "./index.css";
import "./styles/custom-scrollbar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, Suspense, useContext, lazy } from "react";
import useCurrentLocation from "@/hooks/getCurrentLocation";
import LargeSuccessLoader from "@/components/common/Loader";
import { AuthProvider } from '@/contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";


const SplashScreen = lazy(() => import("@/components/common/SplashScreen"));
const Pre_login_homepage = lazy(() => import("@/pages/Pre_login_homepage"));
const Login_page = lazy(() => import("@/pages/Login_page"));
const About_us = lazy(() => import("@/pages/About_us.tsx"));
const Contact_us = lazy(() => import("@/pages/Contact_us"));
const Blogs = lazy(() => import("@/pages/Blogs"));
const Seasonal_destinations = lazy(() => import("@/pages/destinations"));
const PostLoginPage = lazy(() => import("@/pages/Post_Login_Homepage"));
const TravelTipsPage = lazy(() => import("@/pages/TravelTips"));
const ChatBot = lazy(() => import("@/components/chat/ChatBot"));
const Profile = lazy(() => import("@/pages/Profile"));
const SettingsPage = lazy(() => import("@/pages/Setting"));
const Map = lazy(() => import("@/pages/map"));
const BusinessDashboard = lazy(() => import("@/pages/BusinessDashboard"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const TrekDetails = lazy(() => import("@/pages/TrekDetails"));
const DestinationCategory = lazy(() => import("@/pages/DestinationCategory"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const GuideMarketplace = lazy(() => import("@/pages/GuideMarketplace"));

import { useAuth } from "@/contexts/AuthContext";

// Create a context to share the location data
type LocationContextType = {
	location: { latitude: number; longitude: number } | null;
	isLoading: boolean;
	error: string | null;
};

const LocationContext = createContext<LocationContextType | null>(null);

// Custom hook to use the location context
export const useLocation = () => {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error("useLocation must be used within a LocationProvider");
	}
	return context;
};

// LocationProvider component to wrap the app
const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { location, isLoading, error } = useCurrentLocation();

	return (
		<LocationContext.Provider value={{ location, isLoading, error }}>
			{children}
		</LocationContext.Provider>
	);
};

const OnboardingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { authState } = useAuth();

	if (authState === 'checking') {
		return <div className="min-h-screen flex justify-center items-center"><LargeSuccessLoader /></div>;
	}

	return <>{children}</>;
};

const App = () => {
	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<AuthProvider>
				<BrowserRouter>
					<LocationProvider>
						<Suspense fallback={<div className="min-h-screen flex justify-center items-center"><LargeSuccessLoader /></div>}>
							<OnboardingWrapper>
								<Routes>
									<Route path="/" element={<SplashScreen />} />
									<Route path="/welcome" element={<Pre_login_homepage />} />
									<Route path="/explore" element={<PostLoginPage />} />
									<Route path="/about" element={<About_us />} />
									<Route path="/contact" element={<Contact_us />} />
									<Route path="/blogs" element={<Blogs />} />
									<Route path="/map" element={<Map />} />
									<Route path="/login" element={<Login_page />} />
									<Route path="/destinations" element={<Seasonal_destinations />} />
									<Route path="/destinations/:category" element={<DestinationCategory />} />
									<Route path="/tips" element={<TravelTipsPage />} />
									<Route path="/assistant" element={<ChatBot />} />
									<Route path="/profile" element={<Profile />} />
									<Route path="/settings" element={<SettingsPage />} />
									<Route path="/dashboard" element={<BusinessDashboard />} />
									<Route path="/chat/:chatId" element={<ChatPage />} />
									<Route path="/treks" element={<TrekDetails />} />
									<Route path="/marketplace" element={<GuideMarketplace />} />
									<Route path="*" element={<NotFound />} />
								</Routes>
								</OnboardingWrapper>
							</Suspense>
						</LocationProvider>
		</BrowserRouter>
			</AuthProvider>
		</GoogleOAuthProvider>
	);
};

export default App;
