"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function HemthiiiHome() {
  const [letters, setLetters] = useState<any[]>([]);

  useEffect(() => {
    const fetchLetters = async () => {
      const { data, error } = await supabase
        .from("paper_content")
        .select("id, date")
        .order("id", { ascending: false });

      if (!error && data) {
        setLetters(data);
      }
    };
    fetchLetters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-2xl font-bold mb-6 text-center">All Letters</h1>

      <ul className="space-y-3 text-center">
        {letters.map((letter) => (
          <li key={letter.id}>
            <Link
              href={`/hemthiii/${letter.id}`}
              className="block py-2 px-4 bg-white rounded shadow hover:bg-gray-200"
            >
              Letter – {letter.id} | {letter.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
