import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CarouselPlugin } from "../../Shadcn/main/Image_carousel";
import { useNavigate } from "react-router-dom";
import httpClient from "../../../services/httpClient"; // Import your simple httpClient

interface FormInputs {
	email: string;
	password: string;
	confirmPassword: string;
}

const Login_form: React.FC = () => {
	const [mode, setFormMode] = useState<"SignUp" | "SignIn">("SignUp");
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	// Function to handle form mode changes
	const changeMode = () => {
		setFormMode(mode === "SignUp" ? "SignIn" : "SignUp");
		setError("");
		reset();
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<FormInputs>();

	// Handle form submission
	const onSubmit: SubmitHandler<FormInputs> = async (data) => {
		try {
			setError("");

			if (mode === "SignUp") {
				// Registration request
				const response = await httpClient.post(
					"http://localhost:5000/register",
					{
						email: data.email,
						password: data.password,
					},
				);

				if (response.status === 200) {
					alert("Registration successful! Please sign in.");
					setFormMode("SignIn");
					reset();
				}
			} else {
				// Login request
				const response = await httpClient.post(
					"http://localhost:5000/login",
					{
						email: data.email,
						password: data.password,
					},
				);

				if (response.status === 200) {
					navigate("/post-login-homepage");
				}
			}
		} catch (err: any) {
			// Handle different types of errors
			if (err.response?.data?.error) {
				setError(err.response.data.error);
			} else {
				setError(
					mode === "SignUp"
						? "Registration failed. Please try again."
						: "Login failed. Please check your credentials.",
				);
			}
		}
	};

	const password = watch("password");

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="loginform bg-white bg-opacity-20 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-10">
				<div className="Formlogo p-4 sm:p-8 rounded-lg shadow-lg w-full lg:w-1/2 text-center">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#233115]">
						ADVENTURER
					</h1>
					<p className="text-sm text-gray-900 mt-2">
						"Plan your destination with Adventurer."
					</p>
					<div className="z-20 my-6 sm:my-10 flex justify-center align-middle">
						<CarouselPlugin />
					</div>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4 sm:space-y-6 w-full lg:w-1/2"
				>
					{error && (
						<div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
							{error}
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700">
							{mode === "SignUp" ? "Create Email" : "Enter Email"}
						</label>
						<input
							type="email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
							className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							{mode === "SignUp"
								? "Create Password"
								: "Enter Password"}
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Password is required",
							})}
							className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">
								{errors.password.message}
							</p>
						)}
					</div>

					{mode === "SignUp" && (
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Confirm Password
							</label>
							<input
								type="password"
								{...register("confirmPassword", {
									required: "Please confirm your password",
									validate: (value) =>
										value === password ||
										"Passwords do not match",
								})}
								className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
							/>
							{errors.confirmPassword && (
								<p className="text-red-500 text-sm">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					)}

					<button
						type="submit"
						className="w-full py-2 px-4 bg-[#233115] text-white font-semibold rounded-md"
					>
						{mode === "SignUp" ? "Sign Up" : "Sign In"}
					</button>

					<div className="text-center text-sm mt-4">
						<p>Connect with social media</p>
						<button
							type="button"
							className="w-full px-4 py-2 flex justify-center items-center bg-white my-2 text-zinc-950 rounded-md gap-2"
						>
							<FaApple size={20} />
							<span>
								Sign {mode === "SignUp" ? "up" : "in"} with
								Apple
							</span>
						</button>
						<button
							type="button"
							className="w-full px-4 py-2 flex justify-center items-center bg-white my-2 text-zinc-950 rounded-md gap-2"
						>
							<FcGoogle size={20} />
							<span>
								Sign {mode === "SignUp" ? "up" : "in"} with
								Google
							</span>
						</button>
					</div>

					<p className="text-sm text-center mt-4">
						{mode === "SignUp"
							? "Already have an account? "
							: "Don't have an account? "}
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault();
								changeMode();
							}}
							className="text-[#233115] font-semibold"
						>
							{mode === "SignUp" ? "Sign In" : "Sign Up"}
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login_form;
