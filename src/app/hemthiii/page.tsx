'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function HemthiiiDashboard() {
  const [entries, setEntries] = useState<{ id: number; date: string }[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('paper_content')
        .select('id, date')
        .order('id', { ascending: false });

      if (!error && data) {
        setEntries(data);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Letters for myyy prettyy littleee baabbbyyyyy❤️😘</h1>

        <div className="grid gap-4">
          {entries.map(({ id, date }) => (
            <Link
              key={id}
              href={`/hemthiii/${id}`}
              className="block mx-auto w-full max-w-xl rounded-lg bg-white shadow-md p-4 hover:bg-blue-50 transition-all border border-gray-200"
            >
              <div className="text-lg font-semibold">Letter - {id} | {date}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
