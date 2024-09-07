// Login_form.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { log } from 'console';
interface FormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const Login_form: React.FC = () => {

    let [Mode, setFormMode] = useState("SignUp");

    const changeMode = () => {
    setFormMode(Mode === "SignUp" ? "SignIn":"SignUp")
  }
  console.log(Mode);
  

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  const password = watch("password");

 
    if (Mode == "SignUp") {
    return (
        <div className="loginpage min-h-screen flex items-center justify-center bg-transparent ">

        <div className="bg-zinc-700 p-8 rounded-lg shadow-lg w-full max-w-fit flex gap-10">
        <div className="Formlogo bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold text-green-800">ADVENTURER</h1>
          <p className="text-sm text-gray-600">Plan your destination with Adventurer</p>
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

          <div className="text-center text-sm text-gray-600 mt-4">
            <p>Connect with social media</p>
            {/* <div className="flex justify-center space-x-4 mt-2">
              
            </div> */}
              <button type="button" className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md">Sign up with Twitter</button>
              <button type="button" className="px-4 py-2 bg-blue-700 text-white rounded-md">Sign up with Facebook</button>
              <button type="button" className="w-full px-4 py-2 bg-white my-2 text-zinc-950 rounded-md">Sign up with Google</button>

          </div>
          
          <p className="text-sm text-center mt-4">
            Already have an account? <a href="#" onClick={changeMode} className="text-green-800 font-semibold">Sign In</a>
          </p>
        </form>
        </div>
    </div>
    );
    } else {
        return(
            <div className="loginpage min-h-screen flex items-center justify-center bg-transparent">

            <div className="bg-green-950 p-8 rounded-lg shadow-lg w-full max-w-fit flex gap-10">
            <div className="Formlogo bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-4xl font-bold text-green-800">ADVENTURER</h1>
              <p className="text-sm text-gray-600">Plan your destination with Adventurer</p>
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
    
              <div className="text-center text-sm text-gray-600 mt-4">
                <p>Connect with social media</p>
                {/* <div className="flex justify-center space-x-4 mt-2">
                  
                </div> */}
                  <button type="button" className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md">Sign up with Twitter</button>
                  <button type="button" className="px-4 py-2 bg-blue-700 text-white rounded-md">Sign up with Facebook</button>
                  <button type="button" className="w-full px-4 py-2 my-2 bg-white text-zinc-950 rounded-md">Sign up with Google</button>
    
              </div>
              
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
