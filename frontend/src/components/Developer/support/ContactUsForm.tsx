import { useState } from "react";

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
}

const ContactUsForm = () => {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			setSubmitted(true);
			setError(null);
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				message: "",
			});
			setTimeout(() => setSubmitted(false), 3000);
		} catch (err) {
			setError("Failed to submit form. Please try again.");
			console.error("Error submitting form:", err);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<div className="bg-white rounded-lg h-fit shadow-lg p-8">
				<h2 className="text-2xl font-bold text-green-900 mb-4">
					Let's Chat, Reach Out to Us
				</h2>
				<p className="text-green-800 mb-6">
					Have questions about our tours? We're here to help. Send us
					a message, and we'll respond within 24 hours.
				</p>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							value={formData.firstName}
							className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							value={formData.lastName}
							className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
							onChange={handleChange}
							required
						/>
					</div>
					<input
						type="email"
						name="email"
						placeholder="Email Address"
						value={formData.email}
						className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>
					<textarea
						name="message"
						placeholder="Your Message"
						value={formData.message}
						rows={4}
						className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="privacy"
							className="rounded border-green-300 text-green-600 focus:ring-green-500"
							required
						/>
						<label
							htmlFor="privacy"
							className="text-sm text-green-700"
						>
							I agree to the privacy policy
						</label>
					</div>
					<button
						type="submit"
						className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
					>
						Send Message
					</button>
				</form>
				{submitted && (
					<div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
						Thank you! We'll get back to you soon.
					</div>
				)}
				{error && (
					<div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
						{error}
					</div>
				)}
			</div>
		</div>
	);
};

export default ContactUsForm;
