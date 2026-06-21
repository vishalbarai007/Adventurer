import httpClient from "./httpClient";

// Define what the response from your server looks like
interface AuthResponse {
	id: string;
	email: string;
	role?: string;
	name?: string;
	profileCompleted?: boolean;
	onboardingCompleted?: boolean;
	socialLinks?: {
		instagramUsername?: string | null;
		instagramProfileUrl?: string | null;
		isInstagramLinked?: boolean;
	};
	gender?: string | null;
	dateOfBirth?: string | null;
	residentialAddress?: string | null;
	emergencyContact?: {
		name: string;
		phone: string;
		relation: string;
	};
}

export const registerUser = async (
	email: string,
	password: string,
): Promise<AuthResponse> => {
	try {
		const response = await httpClient.post<AuthResponse>("/register", {
			email,
			password,
		});
		return response.data;
	} catch (error: unknown) {
        const axiosError = error as { response?: { data?: { error?: string } } };
		if (axiosError.response?.data?.error) {
			throw new Error(axiosError.response.data.error);
		}
		throw new Error("Registration failed");
	}
};

export const signInUser = async (
	email: string,
	password: string,
): Promise<AuthResponse> => {
	try {
		const response = await httpClient.post<AuthResponse>("/login", {
			email,
			password,
		});
		return response.data;
	} catch (error: unknown) {
        const axiosError = error as { response?: { data?: { error?: string } } };
		if (axiosError.response?.data?.error) {
			throw new Error(axiosError.response.data.error);
		}
		throw new Error("Sign in failed");
	}
};

export const googleOneTapLogin = async (
	credential: string,
): Promise<AuthResponse> => {
	try {
		const response = await httpClient.post<AuthResponse>("/google/one-tap", {
			credential,
		});
		return response.data;
	} catch (error: unknown) {
        const axiosError = error as { response?: { data?: { error?: string } } };
		if (axiosError.response?.data?.error) {
			throw new Error(axiosError.response.data.error);
		}
		throw new Error("Google One-Tap login failed");
	}
};

export const logoutUser = async () => {
    try {
        await httpClient.post("/logout");
    } catch (e) {
        console.error("Logout error", e);
    }
};

export const fetchCurrentUser = async (): Promise<AuthResponse> => {
	try {
		const response = await httpClient.get<AuthResponse>("/me");
		return response.data;
	} catch (error) {
		throw new Error("Not authenticated");
	}
};
