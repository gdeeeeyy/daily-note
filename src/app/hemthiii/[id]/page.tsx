"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PaperScene from "@/components/PaperScene";
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
    <div className="min-h-screen bg-gray-100 text-center relative">
      <Link
        href="/hemthiii"
        className="inline-block mt-6 mb-4 text-blue-600 hover:underline text-sm"
      >
        ← Back to All Letters
      </Link>

      <PaperScene
        text={paperData.text}
        fontSize={paperData.font_size}
        fontColor={paperData.font_color}
        fontFamily={paperData.font_family}
        date={paperData.date}
        imageUrl={paperData.image_url ?? undefined}
        imageWidthPercent={paperData.image_width_percent ?? 100}
        imageHeightPercent={paperData.image_height_percent ?? 100}
        imageOffsetX={paperData.image_offset_x ?? 0}
        imageOffsetY={paperData.image_offset_y ?? 0}
      />
    </div>
  );
}
