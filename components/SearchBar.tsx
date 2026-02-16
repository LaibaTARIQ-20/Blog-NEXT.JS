/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  name: string;
  username: string;
  text: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchPosts = async () => {
      setLoading(true);
      try {
        const postsRef = collection(db, "posts");
        const snapshot = await getDocs(postsRef);

        const filtered = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (post: any) =>
              post.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.username?.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(0, 5) as SearchResult[];

        setResults(filtered);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      searchPosts();
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  function handleResultClick(id: string) {
    router.push(`/${id}`);
    setSearchQuery("");
    setShowResults(false);
  }

  return (
    <div className="relative">
      <div className="flex items-center bg-[#EFF3F4] rounded-full p-3 space-x-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search Busy B"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="bg-transparent outline-none flex-grow text-[#0F1419] placeholder-gray-500"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="w-6 h-6 border-2 border-t-[#FF4B2B] border-gray-200 rounded-full animate-spin mx-auto"></div>
            </div>
          ) : results.length > 0 ? (
            results.map((result) => (
              <div
                key={result.id}
                onClick={() => handleResultClick(result.id)}
                className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {result.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <p className="font-bold text-sm truncate">
                        {result.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        @{result.username}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mt-1">
                      {result.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
