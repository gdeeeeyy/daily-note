"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaperEditor from "@/components/PaperEditor";

export default function HomePage() {
  const [role, setRole] = useState<"Krishna" | "Hemthiii" | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (role === "Hemthiii") {
      router.push("/hemthiii");
    }
  }, [role, router]); // ✅ added router to dependency array

  const handleLogin = () => {
    if (password === "sunflower") {
      setRole("Krishna");
      setError("");
    } else if (password === "sunshine") {
      setRole("Hemthiii");
      setError("");
    } else {
      setError("Invalid password. Try again.");
    }
  };

  if (!role) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5 border border-gray-200 text-center">
          <h1 className="text-2xl font-semibold">
            Login to read your letter for todaayyy my sunshineeee☀️💖
          </h1>

          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition"
          >
            Login
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 text-black text-center">
      {role === "Krishna" && <PaperEditor />}
    </main>
  );
}
