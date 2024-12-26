import Post_login_menubar_content from "./Post_login_menubar_content";
import Post_Login_menubar_Content2 from "./Post_Login_menubar_Content2";

const Post_login_menubar = () => {
  return (
    <div>
      <div className="w-full h-screen grid grid-rows-[10%,65%,1fr] gap-1">
        <div className="w-full bg-zinc-950 p-4">
          {/* logo  */}
          {/* <img src="assets/BrandLogos/Adventurer/adventurer_green.png" className="h-[100%] w-[70%]"/> */}
          <h1 className="text-white text-3xl">Adventurer</h1>

        </div>
        <div className="w-full bg-zinc-950 p-4">
          {/* menubar  */}
          <Post_login_menubar_content/>

        </div>
        <div className="w-full bg-zinc-950 p-4">
          {/* logout */}
          <Post_Login_menubar_Content2/>

        </div>


      </div>

    </div>
  )
}

export default Post_login_menubar;
