// import Post_login_menubar from "../components/Developer/main/Post_login_menubar";
import Postlogin from "../components/Shadcn/main/postlogin";
import { ThemeProvider } from "../Contexts/ThemeContext";
import '../CSS/scrollbar.css'

export default function PostLoginHomepage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Postlogin />
      </div>
    </ThemeProvider>

  );
}

