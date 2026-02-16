import Sidebar from "@/components/sidebar";
import PostFeed from "@/components/PostFeed";
import Widgets from "@/components/Widgets";
import SignupPrompt from "@/components/SignupPrompt";
import CommentModal from "@/components/modals/CommentModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-350 mx-auto flex">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>

      <CommentModal />
      <SignupPrompt />
    </div>
  );
}
