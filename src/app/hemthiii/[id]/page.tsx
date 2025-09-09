"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

// Define a type for the paper data
type PaperData = {
  text: string;
  font_size: number;
  font_color: string;
  font_family: string;
  date: string;
  image_url?: string | null;
  image_width_percent?: number | null;
  image_height_percent?: number | null;
  image_offset_x?: number | null;
  image_offset_y?: number | null;
};

export default function LetterViewer() {
  const { id } = useParams();
  const [paperData, setPaperData] = useState<PaperData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("paper_content")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setPaperData(data as PaperData);
      } else {
        console.error("Error loading paper:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!paperData) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      <Link
        href="/hemthiii"
        className="inline-block mt-6 mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to All Letters
      </Link>

      {/* Paper Container */}
      <div
        className="w-full max-w-3xl p-8 rounded-lg shadow-lg border border-gray-300 relative"
        style={{
          backgroundColor: "#ffffff",
          fontFamily: paperData.font_family,
          fontSize: `${paperData.font_size}px`,
          color: paperData.font_color,
          lineHeight: "1.5", // optional: slightly bigger spacing for readability
          minHeight: "auto",
          background: `
            /* Red margin line */
            linear-gradient(to right, #ff4d4d 2px, transparent 0) 50px 0 / 2px 100% no-repeat,
            /* Horizontal lines with increased spacing */
            repeating-linear-gradient(to bottom, #ffffff 0, #ffffff 39px, #cce0ff 40px)
          `,
          paddingLeft: "60px", // leave space for red margin
          whiteSpace: "pre-wrap",
        }}
      >
        <h1 className="text-2xl font-bold mb-4">{`Letter - ${id}`}</h1>

        <p>{paperData.text}</p>

        {paperData.image_url && (
          <img
            src={paperData.image_url}
            alt="Inserted Image"
            style={{
              width: `${paperData.image_width_percent ?? 100}%`,
              height: `${paperData.image_height_percent ?? "auto"}`,
              display: "block",
              marginLeft: `${paperData.image_offset_x ?? "0"}px`,
              marginTop: `${paperData.image_offset_y ?? "20"}px`,
              marginBottom: "20px",
            }}
          />
        )}

        <p className="mt-6 text-right text-sm text-gray-500">{paperData.date}</p>
      </div>
    </div>
  );
}
