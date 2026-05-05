import httpClient from "./httpClient";

// Define what the response from your server looks like
interface AuthResponse {
	id: string;
	email: string;
	token?: string;
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
		if (response.data.token) {
			localStorage.setItem("jwt_token", response.data.token);
		}
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
		if (response.data.token) {
			localStorage.setItem("jwt_token", response.data.token);
		}
		return response.data;
	} catch (error: unknown) {
        const axiosError = error as { response?: { data?: { error?: string } } };
		if (axiosError.response?.data?.error) {
			throw new Error(axiosError.response.data.error);
		}
		throw new Error("Sign in failed");
	}
};

export const logoutUser = async () => {
    try {
        await httpClient.post("/logout");
    } catch (e) {
        console.error("Logout error", e);
    } finally {
        localStorage.removeItem("jwt_token");
    }
};
