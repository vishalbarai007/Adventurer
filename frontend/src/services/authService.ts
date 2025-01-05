import httpClient from "./httpClient";

// Define what the response from your server looks like
interface AuthResponse {
	id: number;
	email: string;
}

export const registerUser = async (
	email: string,
	password: string,
): Promise<AuthResponse> => {
	try {
		// This actually sends the data to your Flask backend
		const response = await httpClient.post<AuthResponse>("/register", {
			email,
			password,
		});
		return response.data;
	} catch (error: any) {
		if (error.response?.data?.error) {
			throw new Error(error.response.data.error);
		}
		throw new Error("Registration failed");
	}
};

export const signInUser = async (
	email: string,
	password: string,
): Promise<AuthResponse> => {
	try {
		// This sends login data to your Flask backend
		const response = await httpClient.post<AuthResponse>("/login", {
			email,
			password,
		});
		return response.data;
	} catch (error: any) {
		if (error.response?.data?.error) {
			throw new Error(error.response.data.error);
		}
		throw new Error("Sign in failed");
	}
};
