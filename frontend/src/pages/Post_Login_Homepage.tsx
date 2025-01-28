// import Post_login_menubar from "../components/Developer/main/Post_login_menubar";
// import Postlogin from "../components/Shadcn/main/postlogin";
// import { ThemeProvider } from "../Contexts/ThemeContext";
// import '../CSS/scrollbar.css'

// export default function PostLoginHomepage() {
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <div>
//         <Postlogin />

//       </div>
//     </ThemeProvider>

//   );
// }

import PostHeader from "../components/Developer/main/PostLoginComponents/Header"
// import { ImageGrid } from "../components/Developer/main/PostLoginComponents/image-grid"
import { ProfileCards } from "../components/Developer/main/PostLoginComponents/profile-cards"
// import { SearchBar } from "../components/Developer/main/PostLoginComponents/search-bar"
import Sidebar from "../components/Developer/main/PostLoginComponents/sidebar"
import { Suggestions } from "../components/Developer/main/PostLoginComponents/suggestions"

export default function PostLoginPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-[20%,60%,20%] bg-[#012c18]">

      <div className="w-full"><Sidebar /></div>
      <div className="w-full ">
        <PostHeader />
        <ProfileCards />
        {/* <SearchBar /> */}
        {/* <ImageGrid /> */}


      </div>
      <div className="w-full"> <Suggestions /></div>
    </div>
  )
}

