/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "@/components/sidebar";
import Widgets from "@/components/Widgets";
import PostHeader from "@/components/PostHeader";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CommentModal from "@/components/modals/CommentModal";

// ✅ FIX: Add proper TypeScript interface for post data
interface PostData {
  id: string;
  name: string;
  username: string;
  text: string;
  timestamp: any;
  likes?: string[];
  comments?: Array<{
    name: string;
    username: string;
    timestamp: any;
    comment: string;
  }>;
}

async function fetchPost(id: string): Promise<PostData | null> {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    return null;
  }

  return {
    id: postSnap.id,
    ...postSnap.data(),
  } as PostData;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
          <Link href="/" className="text-[#FF4B2B] hover:underline mt-4 block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="flex min-h-screen max-w-350 mx-auto justify-center">
        <Sidebar />

        <div className="grow max-w-2xl border-x border-gray-100 ml-0 lg:ml-68.75">
          <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm p-3 border-b border-gray-100 flex items-center space-x-4">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded-full p-0.5" />
            </Link>
            <h1 className="text-xl font-bold">Post</h1>
          </header>

          {/* Original Post */}
          <div className="border-b border-gray-100 p-3">
            <PostHeader
              name={post.name}
              username={post.username}
              timestamp={post.timestamp}
              text={post.text}
            />
          </div>

          {/* Comments Section */}
          <div className="border-b-8 border-gray-100">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-100 p-3">
                  <PostHeader
                    name={comment.name}
                    username={comment.username}
                    timestamp={comment.timestamp}
                    text={comment.comment}
                  />
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </div>

        <Widgets />
      </main>
      <CommentModal />
    </div>
  );
}
