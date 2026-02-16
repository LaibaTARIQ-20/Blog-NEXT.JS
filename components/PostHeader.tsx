/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import moment from "moment";

interface PostHeaderProps {
  name: string;
  username: string;
  timestamp: any;
  text: string;
}

export default function PostHeader({
  name,
  username,
  timestamp,
  text,
}: PostHeaderProps) {
  // Format timestamp
  const getTimeAgo = () => {
    if (!timestamp) return "";
    try {
      return moment(timestamp.toDate()).fromNow();
    } catch {
      return "";
    }
  };

  return (
    <div>
      {/* User Info */}
      <div className="flex items-center space-x-1">
        <p className="font-bold hover:underline cursor-pointer dark:text-white">
          {name}
        </p>
        <p className="text-gray-500 dark:text-gray-400">@{username}</p>
        <span className="text-gray-500 dark:text-gray-400">·</span>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {getTimeAgo()}
        </p>
      </div>

      {/* Post Text */}
      <p className="mt-2 text-[#0F1419] dark:text-white">{text}</p>
    </div>
  );
}
