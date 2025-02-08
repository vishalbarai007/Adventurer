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
    <div className="post min-h-screen w-full grid grid-cols-[15%,70%,15%] bg-[#edf2f7]">

      <div className="w-full border-1 *:border-[#012c18]"><Sidebar /></div>
      <div className="w-full border-1 *:border-[#012c18]">
        <PostHeader />
        <ProfileCards />
        {/* <SearchBar /> */}
        {/* <ImageGrid /> */}


      </div>
      <div className="w-full border-1 *:border-[#012c18]"> <Suggestions /></div>
    </div>
  )
}

