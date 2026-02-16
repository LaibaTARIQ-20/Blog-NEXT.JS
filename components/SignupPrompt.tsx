/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

export default function SignupPrompt() {
  const user = useSelector((state: RootState) => state.user);

  if (user.username) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-white">
          <h2 className="text-xl font-bold">Don't miss what's happening</h2>
          <p className="text-sm">People on Busy B are the first to know.</p>
        </div>

        <div className="flex space-x-3">
          <Link
            href="/login"
            className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#FF4B2B] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-white text-[#FF4B2B] rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
