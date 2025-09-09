"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

// Define the type for paper_content table rows
type PaperContent = {
  id: number;
  date: string;
};

export default function HemthiiiHome() {
  const [letters, setLetters] = useState<PaperContent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("paper_content")
        .select("id, date")
        .order("id", { ascending: false });

      if (!error && data) {
        setLetters(data as PaperContent[]);
      } else {
        console.error("Error fetching letters:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl font-semibold mb-6">📜 All Letters</h1>
      <ul className="space-y-4">
        {letters.map((letter) => (
          <li key={letter.id}>
            <Link
              href={`/hemthiii/${letter.id}`}
              className="block p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
            >
              Letter - {letter.id} | {letter.date}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
