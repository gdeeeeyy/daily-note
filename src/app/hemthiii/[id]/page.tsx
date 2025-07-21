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
        });
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
      />
    </div>
  );
}
