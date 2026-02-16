/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { db } from "@/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { setCommentDetails } from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import PostHeader from "./PostHeader";
import {
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface PostProps {
  data: {
    name: string;
    username: string;
    text: string;
    timestamp: any;
    likes: string[];
    comments: any[];
  };
  id: string;
}

export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const isLiked = data.likes?.includes(user.uid);

  async function likePost(e: React.MouseEvent) {
    e.stopPropagation();

    if (!user.username) {
      router.push("/login");
      return;
    }

    const postRef = doc(db, "posts", id);

    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  }

  function handleComment(e: React.MouseEvent) {
    e.stopPropagation();

    if (!user.username) {
      router.push("/login");
      return;
    }

    dispatch(
      setCommentDetails({
        id,
        name: data.name,
        username: data.username,
        text: data.text,
        timestamp: data.timestamp,
      }),
    );
  }

  function handlePostClick() {
    router.push(`/${id}`);
  }

  return (
    <div
      className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
      onClick={handlePostClick}
    >
      <div className="flex space-x-3">
        <Image
          src="/assets/profile-pic.png"
          width={48}
          height={48}
          alt="User"
          className="rounded-full"
        />

        <div className="flex-1">
          <PostHeader
            name={data.name}
            username={data.username}
            timestamp={data.timestamp}
            text={data.text}
          />

          <div className="flex justify-between mt-3 text-gray-500 max-w-md">
            {/* Comments */}
            <div
              className="flex items-center space-x-2 group"
              onClick={handleComment}
            >
              <ChatBubbleOvalLeftIcon className="w-5 h-5 group-hover:bg-blue-100 group-hover:text-blue-500 rounded-full p-0.5 transition-colors" />
              <span className="text-sm group-hover:text-blue-500">
                {data.comments?.length || 0}
              </span>
            </div>

            {/* Retweet */}
            <div className="flex items-center space-x-2 group">
              <ArrowPathRoundedSquareIcon className="w-5 h-5 group-hover:bg-green-100 group-hover:text-green-500 rounded-full p-0.5 transition-colors" />
              <span className="text-sm group-hover:text-green-500">0</span>
            </div>

            {/* Like */}
            <div
              className="flex items-center space-x-2 group"
              onClick={likePost}
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5 text-pink-500" />
              ) : (
                <HeartIcon className="w-5 h-5 group-hover:bg-pink-100 group-hover:text-pink-500 rounded-full p-0.5 transition-colors" />
              )}
              <span
                className={`text-sm ${isLiked ? "text-pink-500" : "group-hover:text-pink-500"}`}
              >
                {data.likes?.length || 0}
              </span>
            </div>

            {/* Analytics */}
            <div className="flex items-center space-x-2 group">
              <ChartBarIcon className="w-5 h-5 group-hover:bg-blue-100 group-hover:text-blue-500 rounded-full p-0.5 transition-colors" />
            </div>

            {/* Share */}
            <div className="flex items-center space-x-2 group">
              <ShareIcon className="w-5 h-5 group-hover:bg-blue-100 group-hover:text-blue-500 rounded-full p-0.5 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
