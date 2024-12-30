import Post_login_menubar from "../components/ui/Post_login_menubar";

export default function PostLoginHomepage() {
    return (
      <div className="h-screen w-full bg-zinc-900 grid grid-cols-[20%,50%,1fr] gap-4">
        <div className="bg-zinc-950 "><Post_login_menubar/>
        </div>
  <div className="bg-blue-500">Column 2 (45%)</div>
  <div className="bg-green-500">Column 3 (Remaining 30%)</div>


      </div>
    );
  }
  
  