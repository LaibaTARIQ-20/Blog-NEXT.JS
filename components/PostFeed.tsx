"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setPosts, setPostsLoading } from "@/redux/slices/postsSlice";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "./Post";
import PostInput from "./PostInput";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function PostFeed() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setPosts(postsData));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="flex-1 max-w-[600px] border-x border-gray-200 min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-[#0F1419]">Home</h1>
        <SparklesIcon className="w-6 h-6 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors" />
      </header>

      <PostInput />

      <div>
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-t-[#FF4B2B] border-gray-200 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-semibold mb-2">No posts yet</p>
            <p className="text-sm">Be the first to post something!</p>
          </div>
        ) : (
          posts.map((post) => <Post key={post.id} data={post} id={post.id} />)
        )}
      </div>
    </div>
  );
}
