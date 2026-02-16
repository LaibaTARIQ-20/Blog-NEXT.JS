/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCommentModal } from "@/redux/slices/modalSlice";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface PostInputProps {
  insideModal?: boolean;
}

export default function PostInput({ insideModal = false }: PostInputProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentDetails,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  function onEmojiClick(emojiData: EmojiClickData) {
    setText((prevText) => prevText + emojiData.emoji);
  }

  async function sendPost() {
    if (!text.trim()) return;

    if (!user.username) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      if (insideModal && commentDetails) {
        const postRef = doc(db, "posts", commentDetails.id);
        await updateDoc(postRef, {
          comments: arrayUnion({
            name: user.name,
            username: user.username,
            comment: text,
            timestamp: new Date(),
          }),
        });

        dispatch(closeCommentModal());
        setText("");
      } else {
        await addDoc(collection(db, "posts"), {
          name: user.name,
          username: user.username,
          text,
          timestamp: serverTimestamp(),
          likes: [],
          comments: [],
        });
        setText("");
      }
      setShowEmojiPicker(false);
    } catch (error: any) {
      console.error("Error posting:", error);
      alert("Failed to post. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex space-x-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 relative">
      <Image
        src={user.photoUrl || "/public/profile.jfif"}
        width={48}
        height={48}
        alt="User"
        className="rounded-full"
      />

      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={insideModal ? "Post your reply" : "What's happening?"}
          className="w-full text-lg outline-none resize-none bg-transparent placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400 min-h-[50px]"
          rows={insideModal ? 2 : 3}
        />

        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-2 relative">
            <PhotoIcon className="w-5 h-5 text-[#FF4B2B] cursor-pointer hover:bg-red-50 rounded-full p-0.5" />

            <div className="relative">
              <FaceSmileIcon
                className="w-5 h-5 text-[#FF4B2B] cursor-pointer hover:bg-red-50 rounded-full p-0.5"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />

              {showEmojiPicker && (
                <div className="absolute top-8 left-0 z-50">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={sendPost}
            disabled={!text.trim() || loading}
            className="bg-[#FF4B2B] text-white px-4 py-2 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF416C] transition-colors"
          >
            {loading ? "Posting..." : insideModal ? "Reply" : "Post"}
          </button>
        </div>
      </div>

      {/* Click outside to close emoji picker */}
      {showEmojiPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  );
}
