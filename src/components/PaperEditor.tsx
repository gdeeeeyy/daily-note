'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import PaperScene from './PaperScene';

export default function PaperEditor() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Poppins');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageWidthPercent, setImageWidthPercent] = useState(100);
  const [imageHeightPercent, setImageHeightPercent] = useState(100);
  const [imageOffsetX, setImageOffsetX] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(0);

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
        image_offset_x: imageOffsetX,
        image_offset_y: imageOffsetY,
      },
    ]);

    if (error) {
      console.error('Save failed:', error);
      alert('Save failed: ' + error.message);
    } else {
      alert('Saved successfully!');
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-5xl mx-auto">
      <textarea
        className="w-full border border-gray-300 rounded p-3 text-base"
        rows={6}
        placeholder="Write your letter..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            className="w-12 h-10 p-0 border"
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

        <label className="flex flex-col col-span-2">
          Image URL
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-1 rounded"
            placeholder="Paste public image URL here"
          />
        </label>

        <label className="flex flex-col">
          Width %
          <input
            type="number"
            value={imageWidthPercent}
            onChange={(e) => setImageWidthPercent(Number(e.target.value))}
            className="border p-1 rounded"
          />
        </label>

        <label className="flex flex-col">
          Height %
          <input
            type="number"
            value={imageHeightPercent}
            onChange={(e) => setImageHeightPercent(Number(e.target.value))}
            className="border p-1 rounded"
          />
        </label>

        <label className="flex flex-col">
          Offset X
          <input
            type="number"
            value={imageOffsetX}
            onChange={(e) => setImageOffsetX(Number(e.target.value))}
            className="border p-1 rounded"
          />
        </label>

        <label className="flex flex-col">
          Offset Y
          <input
            type="number"
            value={imageOffsetY}
            onChange={(e) => setImageOffsetY(Number(e.target.value))}
            className="border p-1 rounded"
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Letter
      </button>

      <div className="mt-6 h-[80vh] border rounded shadow">
        <PaperScene
          text={text}
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
          date={date}
          imageUrl={imageUrl}
          imageWidthPercent={imageWidthPercent}
          imageHeightPercent={imageHeightPercent}
          imageOffsetX={imageOffsetX}
          imageOffsetY={imageOffsetY}
        />
      </div>
    </div>
  );
}
