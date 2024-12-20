import Login_form from "./Login_Form";


const Login_page_background_animation = () => {
  return (
    <div className="loginpagebackground relative h-fit w-100% object-cover">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <Login_form/>
    </div>
  )
}

export default Login_page_background_animation;