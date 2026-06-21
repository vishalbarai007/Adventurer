import { Grid, Bookmark, Tag } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
}

const ProfileTabs = ({ activeTab, setActiveTab, isMobile }: ProfileTabsProps) => {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 mb-4">
      <div className="flex justify-around">
        <button
          className={`flex items-center py-3 px-4 ${
            activeTab === "posts" ? "border-t-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("posts")}
        >
          <Grid className="w-4 h-4 mr-1" />
          <span className={isMobile ? "hidden" : ""}>POSTS</span>
        </button>
        <button
          className={`flex items-center py-3 px-4 ${
            activeTab === "saved" ? "border-t-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          <Bookmark className="w-4 h-4 mr-1" />
          <span className={isMobile ? "hidden" : ""}>SAVED</span>
        </button>
        <button
          className={`flex items-center py-3 px-4 ${
            activeTab === "tagged" ? "border-t-2 border-black dark:border-white" : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("tagged")}
        >
          <Tag className="w-4 h-4 mr-1" />
          <span className={isMobile ? "hidden" : ""}>TAGGED</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileTabs;