/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@/redux/slices/userSlice";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Redirect if already logged in
  useEffect(() => {
    if (user.username) {
      router.push("/");
    }
  }, [user.username, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      dispatch(
        setUser({
          uid: userCredentials.user.uid,
          email: userCredentials.user.email || "",
          name: userCredentials.user.displayName || "User",
          username: userCredentials.user.email?.split("@")[0] || "user",
          photoUrl: userCredentials.user.photoURL || "/assets/profile-pic.png",
        }),
      );

      router.push("/");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  async function handleGuestLogin() {
    setError("");
    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        "guest@example.com",
        "password123",
      );

      dispatch(
        setUser({
          uid: userCredentials.user.uid,
          email: userCredentials.user.email || "",
          name: "Guest User",
          username: "guest",
          photoUrl: "/assets/profile-pic.png",
        }),
      );

      router.push("/");
    } catch (err: any) {
      setError("Guest account not found. Please sign up first.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF4B2B] to-[#FF416C] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">B</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back!</h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to continue to Busy B
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B2B] focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF4B2B] focus:border-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          Guest Login
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#FF4B2B] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
