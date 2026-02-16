import Sidebar from "@/components/sidebar"; // ← Fix: Capital S
import PostFeed from "@/components/PostFeed";
import Widgets from "@/components/Widgets";
import SignupPrompt from "@/components/SignupPrompt";
import CommentModal from "@/components/modals/CommentModal";

export default function Home() {
  return (
    // ❌ REMOVE <ThemeProvider> wrapper from here!
    <div className="min-h-screen bg-white dark:bg-[#15202B] transition-colors">
      <div className="max-w-[1400px] mx-auto flex justify-center">
        <Sidebar />
        <PostFeed />
        <Widgets />
      </div>

      <CommentModal />
      <SignupPrompt />
    </div>
  );
}
