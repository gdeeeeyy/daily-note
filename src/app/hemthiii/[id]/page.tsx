'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import PaperScene from '@/components/PaperScene';
import Link from 'next/link';

export default function LetterViewer() {
  const { id } = useParams();
  const [paperData, setPaperData] = useState<{
    text: string;
    font_size: number;
    font_color: string;
    font_family: string;
    date: string;
    image_url?: string;
    image_width_percent?: number;
    image_height_percent?: number;
    image_offset_x?: number;
    image_offset_y?: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('paper_content')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setPaperData({
          text: data.text,
          font_size: data.font_size,
          font_color: data.font_color,
          font_family: data.font_family,
          date: data.date,
          image_url: data.image_url,
          image_width_percent: data.image_width_percent || 100,
          image_height_percent: data.image_height_percent || 100,
          image_offset_x: data.image_offset_x || 0,
          image_offset_y: data.image_offset_y || 0,
        });
      } else {
        console.error('Error loading paper:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!paperData) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-center">
      <Link href="/hemthiii" className="inline-block mt-6 mb-4 text-blue-600 hover:underline text-sm">
        ← Back to All Letters
      </Link>
      <PaperScene
        text={paperData.text}
        fontSize={paperData.font_size}
        fontColor={paperData.font_color}
        fontFamily={paperData.font_family}
        date={paperData.date}
        imageUrl={paperData.image_url}
        imageWidthPercent={paperData.image_width_percent}
        imageHeightPercent={paperData.image_height_percent}
        imageOffsetX={paperData.image_offset_x}
        imageOffsetY={paperData.image_offset_y}
      />
    </div>
  );
}
