// Login_form.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import {CarouselPlugin} from "./Image_carousel";


interface FormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const Login_form: React.FC = () => {

    let [Mode, setFormMode] = useState("SignUp");

    const changeMode = () => {
    setFormMode(Mode === "SignUp" ? "SignIn":"SignUp");
    }
  console.log(Mode);
  

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  const password = watch("password");

 
    if (Mode == "SignUp") {
    return (
        <div className="min-h-screen flex items-center justify-center  ">
        <div className="loginform p-8 rounded-lg shadow-lg w-full max-w-fit flex gap-10">

        <div className="Formlogo p-8 rounded-lg shadow-lg w-full max-w-md text-center ">
          <h1 className="text-4xl font-bold text-green-800">ADVENTURER</h1>
          <p className="text-sm text-gray-600">Plan your destination with Adventurer</p>

          <div className=' z-20 my-10 h-1/2 w-[100%] flex justify-center align-middle'>
            <CarouselPlugin/>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-fit">  
          <div>
            <label className="block text-sm font-medium text-gray-700">Create Username</label>
            <input 
              type="text" 
              {...register("username", { required: "Username is required" })} 
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Create Password</label>
            <input 
              type="password" 
              {...register("password", { required: "Password is required" })} 
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              {...register("confirmPassword", { 
                required: "Please confirm your password", 
                validate: value => value === password || "Passwords do not match"
              })} 
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-green-800 text-white font-semibold rounded-md">
            Continue
          </button>

          <div className="text-center text-sm mt-4 ">
            <p>Connect with social media</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button type="button" className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md flex gap-2"><FaSquareTwitter size={40}/><h1>Sign up with Twitter</h1></button>
              <button type="button" className="px-4 py-2 m-2 bg-blue-700 text-white rounded-md flex gap-2"><FaFacebook size={40}/><h1>Sign up with Facebook</h1></button>
              
            </div>
          </div>
          <button type="button" className="w-full px-4 py-2 flex justify-center bg-white my-2 text-zinc-950 rounded-md flex gap-2"><FcGoogle size={40}/><h1>Sign up with Google</h1></button>
          
          <p className="text-sm text-center mt-4">
            Already have an account? <a href="#" onClick={changeMode} className="text-green-800 font-semibold">Sign In</a>
          </p>
        </form>
        </div>
    </div>
    );
    } else {
        return(
            <div className=" min-h-screen flex items-center justify-center bg-transparent">

            <div className=" loginform p-8 rounded-lg shadow-lg w-full max-w-fit flex gap-10">
            <div className="Formlogo p-8 rounded-lg shadow-lg w-full max-w-md text-center ">
          <h1 className="text-4xl font-bold text-green-800">ADVENTURER</h1>
          <p className="text-sm text-gray-600">Plan your destination with Adventurer</p>

          <div className=' z-20 my-10 h-1/2 w-[100%] flex justify-center align-middle'>
            <CarouselPlugin/>
          </div>
        </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-fit">
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Create Username</label>
                <input 
                  type="text" 
                  {...register("username", { required: "Username is required" })} 
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700">Create Password</label>
                <input 
                  type="password" 
                  {...register("password", { required: "Password is required" })} 
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
    
             
    
              <button type="submit" className="w-full py-2 px-4 bg-green-800 text-white font-semibold rounded-md">
                Continue
              </button>
    
              <div className="text-center text-sm mt-4 ">
            <p>Connect with social media</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button type="button" className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md flex gap-2"><FaSquareTwitter size={40}/><h1>Sign up with Twitter</h1></button>
              <button type="button" className="px-4 py-2 m-2 bg-blue-700 text-white rounded-md flex gap-2"><FaFacebook size={40}/><h1>Sign up with Facebook</h1></button>
              
            </div>
          </div>
          <button type="button" className="w-full px-4 py-2 flex justify-center bg-white my-2 text-zinc-950 rounded-md flex gap-2"><FcGoogle size={40}/><h1>Sign up with Google</h1></button>
              
              <p className="text-sm text-center mt-4">
                Didn't have an account? <a href="#" onClick={changeMode} className="text-green-800 font-semibold">Sign Up</a>
              </p>
            </form>
            </div>
        </div>
        )
        
    }
  
};

export default Login_form;
