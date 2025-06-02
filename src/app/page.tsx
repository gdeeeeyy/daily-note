"use client";

import { useState, useEffect } from "react";
import PaperEditor from "@/components/PaperEditor";
import PaperScene from "@/components/PaperScene";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const [role, setRole] = useState<"Krishna" | "Hemthiii" | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [paperData, setPaperData] = useState<{
    text: string;
    font_size: number;
    font_color: string;
    font_family: string;
  } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("paper_content")
        .select("*")
        .eq("id", "singleton-paper")
        .single();

      if (!error && data) {
        setPaperData({
          text: data.text,
          font_size: data.font_size,
          font_color: data.font_color,
          font_family: data.font_family,
        });
      }
    };

    if (role === "Hemthiii") {
      fetchContent();
    }
  }, [role]);

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
      <main className="min-h-screen flex items-center justify-center bg-neutral-100 text-black">
        <div className="bg-white p-6 rounded shadow w-full max-w-md space-y-4">
          <h1 className="text-xl font-semibold">Login to View Paper</h1>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-neutral-100 text-black">
      {role === "Krishna" ? (
        <PaperEditor />
      ) : (
        paperData && (
          <PaperScene
            text={paperData.text}
            fontSize={paperData.font_size}
            fontColor={paperData.font_color}
            fontFamily={paperData.font_family}
          />
        )
      )}
    </main>
  );
}
