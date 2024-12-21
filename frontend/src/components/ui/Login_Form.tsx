import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaApple, FaFacebook, FaInstagram } from "react-icons/fa";
// import { FaSquareTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { CarouselPlugin } from "./Image_carousel";

interface FormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const Login_form: React.FC = () => {
  const [Mode, setFormMode] = useState("SignUp");

  const changeMode = () => {
    setFormMode(Mode === "SignUp" ? "SignIn" : "SignUp");
  }

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="loginform bg-white bg-opacity-20 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-10">
        <div className="Formlogo p-4 sm:p-8 rounded-lg shadow-lg w-full lg:w-1/2 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#233115]">ADVENTURER</h1>
          <p className="text-sm text-gray-900 mt-2">"Plan your destination with Adventurer."</p>
          <div className='z-20 my-6 sm:my-10 flex justify-center align-middle'>
            <CarouselPlugin />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 w-full lg:w-1/2">
          {Mode === "SignUp" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Create Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
          )}

          {Mode === "SignIn" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter Username</label>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">{Mode === "SignUp" ? "Create Password" : "Enter Password"}</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {Mode === "SignUp" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
                })}
                className="mt-1 w-full px-4 py-2 border bg-[#d4d9d1] rounded-md focus:ring-green-500 focus:border-green-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>
          )}

          <button type="submit" className="w-full py-2 px-4 bg-[#233115] text-white font-semibold rounded-md">
            Continue
          </button>

          <div className="text-center text-sm mt-4">
            <p>Connect with social media</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
              <button type="button" className="px-4 py-2 bg-white text-black rounded-md flex items-center justify-center gap-2">
                <FaApple size={20} /><span>Sign up with Apple</span>
              </button>
              <button
                type="button"
                className="px-4 py-2 text-white rounded-md flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}
              >
                <FaInstagram size={20} />
                <span>Sign up with Instagram</span>
              </button>
            </div>
          </div>
          <button type="button" className="w-full px-4 py-2 flex justify-center items-center bg-white my-2 text-zinc-950 rounded-md gap-2">
            <FcGoogle size={20} /><span>Sign up with Google</span>
          </button>

          <p className="text-sm text-center mt-4">
            {Mode === "SignUp" ? "Already have an account? " : "Don't have an account? "}
            <a href="#" onClick={changeMode} className="text-[#233115] font-semibold">
              {Mode === "SignUp" ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login_form;

