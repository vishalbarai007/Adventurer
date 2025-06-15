import "./App.css";
import "./index.css";
import "./styles/custom-scrollbar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pre_login_homepage from "./pages/Pre_login_homepage";
import Login_page from "./pages/Login_page";
import About_us from "./pages/About_us";
import Contact_us from "./pages/Contact_us";
import Blogs from "./pages/Blogs";
import Seasonal_destinations from "./pages/destinations";
import SplashScreen from "./components/Developer/main/SplashScreen";
import PostLoginPage from "./pages/Post_Login_Homepage";
import TravelTipsPage from "./pages/TravelTips";
import ChatBot from "./components/Developer/main/ChatBot";
import Profile from "./pages/Profile";
import { Suspense } from "react";
import SettingsPage from "./pages/Setting";
// import useCurrentLocation from "./hooks/getCurrentLocation";
// import Map from "./pages/map";
import LargeSuccessLoader from "./components/Developer/support/Loader";

// Create a context to share the location data
// type LocationContextType = {
// 	location: { latitude: number; longitude: number } | null;
// 	isLoading: boolean;
// 	error: string | null;
// };

// const LocationContext = createContext<LocationContextType | null>(null);

// Custom hook to use the location context
// export const useLocation = () => {
// 	const context = useContext(LocationContext);
// 	if (!context) {
// 		throw new Error("useLocation must be used within a LocationProvider");
// 	}
// 	return context;
// };

// LocationProvider component to wrap the app
// const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// 	const { location, isLoading, error } = useCurrentLocation();

	// return (
	// 	<LocationContext.Provider value={{ location, isLoading, error }}>
	// 		{children}
	// 	</LocationContext.Provider>
	// );
// };

const App = () => {
	return (
		<BrowserRouter>
			{/* <LocationProvider> */}
				<Suspense fallback={<div className="min-h-screen flex justify-center items-center"><LargeSuccessLoader /></div>}>
					<Routes>
						<Route path="/" element={<SplashScreen />} />
						<Route path="/pre-login-homepage" element={<Pre_login_homepage />} />
						<Route path="/post-login-homepage" element={<PostLoginPage />} />
						<Route path="/about" element={<About_us />} />
						<Route path="/contact" element={<Contact_us />} />
						<Route path="/blogs" element={<Blogs />} />
						{/* <Route path="/map" element={<Map />} /> */}
						<Route path="/login" element={<Login_page />} />
						<Route path="/destinations" element={<Seasonal_destinations />} />
						<Route path="/tips" element={<TravelTipsPage />} />
						<Route path="/chatbot" element={<ChatBot />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/settings" element={<SettingsPage />} />
					</Routes>
				</Suspense>
			{/* </LocationProvider> */}
		</BrowserRouter>
	);
};

export default App;
