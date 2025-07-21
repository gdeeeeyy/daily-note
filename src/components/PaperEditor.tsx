'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import dynamic from 'next/dynamic';

const PaperScene = dynamic(() => import('./PaperScene'), { ssr: false });

export default function PaperEditor() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidthPercent, setImageWidthPercent] = useState(100);
  const [imageHeightPercent, setImageHeightPercent] = useState(100);
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Poppins');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSave = async () => {
    const { error } = await supabase.from('paper_content').insert([
      {
        text,
        font_size: fontSize,
        font_color: fontColor,
        font_family: fontFamily,
        date,
        image_url: imageUrl,
        image_width_percent: imageWidthPercent,
        image_height_percent: imageHeightPercent,
      },
    ]);

    if (error) {
      alert('Save failed');
      console.error(error);
    } else {
      alert('Saved successfully!');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <textarea
        className="w-full border border-gray-300 rounded p-3 text-base"
        rows={10}
        placeholder="Write your letter..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="space-y-2">
        <label className="flex flex-col">
          Image URL
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-1 rounded"
            placeholder="Paste public image URL here"
          />
        </label>

        <div className="flex flex-wrap gap-4">
          <label className="flex flex-col">
            Image Width (%)
            <input
              type="number"
              value={imageWidthPercent}
              onChange={(e) => setImageWidthPercent(Number(e.target.value))}
              className="border p-1 rounded"
            />
          </label>

          <label className="flex flex-col">
            Image Height (%)
            <input
              type="number"
              value={imageHeightPercent}
              onChange={(e) => setImageHeightPercent(Number(e.target.value))}
              className="border p-1 rounded"
            />
          </label>

          <label className="flex flex-col">
            Font Size
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="border p-1 rounded"
            />
          </label>

          <label className="flex flex-col">
            Font Color
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-12 h-10 border"
            />
          </label>

          <label className="flex flex-col">
            Font Family
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="Poppins">Poppins</option>
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>

          <label className="flex flex-col">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-1 rounded"
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save Letter
      </button>

      <div className="mt-6 h-[600px] border rounded">
        <PaperScene
          text={text}
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
          date={date}
          imageUrl={imageUrl}
          imageWidthPercent={imageWidthPercent}
          imageHeightPercent={imageHeightPercent}
        />
      </div>
    </div>
  );
}
