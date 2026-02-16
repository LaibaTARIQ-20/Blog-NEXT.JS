/* eslint-disable react/no-unescaped-entities */
"use client";

import SearchBar from "./SearchBar";

const trendingTopics = [
  { category: "Technology", topic: "AI Development", posts: "125K" },
  { category: "Sports", topic: "Champions League", posts: "89K" },
  { category: "Entertainment", topic: "New Movie Release", posts: "64K" },
  { category: "Politics", topic: "Election Updates", posts: "212K" },
];

const whoToFollow = [
  { name: "Tech Insider", username: "techinsider", verified: true },
  { name: "Jane Developer", username: "janedev", verified: false },
  { name: "Sports Hub", username: "sportshub", verified: true },
];

export default function Widgets() {
  return (
    <div className="hidden xl:flex flex-col w-[350px] px-4 py-3 space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white dark:bg-[#15202B] pt-2 z-40">
        <SearchBar />
      </div>

      {/* What's Happening */}
      <div className="bg-[#F7F9F9] dark:bg-[#192734] rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold text-[#0F1419] dark:text-white p-4">
          What's happening
        </h2>

        {trendingTopics.map((trend, index) => (
          <div
            key={index}
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {trend.category} · Trending
            </p>
            <p className="font-bold text-[#0F1419] dark:text-white mt-0.5">
              {trend.topic}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {trend.posts} posts
            </p>
          </div>
        ))}

        <button className="text-[#FF4B2B] hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 w-full text-left transition-colors">
          Show more
        </button>
      </div>

      {/* Who to Follow */}
      <div className="bg-[#F7F9F9] dark:bg-[#192734] rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold text-[#0F1419] dark:text-white p-4">
          Who to follow
        </h2>

        {whoToFollow.map((profile, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] rounded-full flex items-center justify-center text-white font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <p className="font-bold text-[#0F1419] dark:text-white">
                    {profile.name}
                  </p>
                  {profile.verified && (
                    <svg
                      className="w-4 h-4 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{profile.username}
                </p>
              </div>
            </div>
            <button className="bg-[#0F1419] dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Follow
            </button>
          </div>
        ))}

        <button className="text-[#FF4B2B] hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-3 w-full text-left transition-colors">
          Show more
        </button>
      </div>
    </div>
  );
}
