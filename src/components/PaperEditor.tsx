"use client";

import { useEffect, useState } from "react";
import PaperScene from "./PaperScene";
import { supabase } from "../lib/supabaseClient";

export default function PaperEditor() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("serif");
  const [date, setDate] = useState("");

  // Load latest paper (optional - if you still want to fetch `singleton-paper`)
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from("paper_content").select("*").eq("id", "singleton-paper").single();
      if (data) {
        setText(data.text);
        setFontSize(data.font_size);
        setFontColor(data.font_color);
        setFontFamily(data.font_family);
        setDate(data.date || "");
      }
    };
    fetchContent();
  }, []);

  const generateRandomId = () => Math.floor(100000 + Math.random() * 900000); // 6-digit random number

  // Save button
  const handleSave = async () => {
    const randomId = generateRandomId();

    const { error } = await supabase.from("paper_content").insert({
      id: randomId,
      text,
      font_size: fontSize,
      font_color: fontColor,
      font_family: fontFamily,
      date,
    });

    if (error) {
      console.error("Failed to save paper content:", error.message);
      alert("Failed to save paper content.");
    } else {
      alert(`Content saved with ID: ${randomId}`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <textarea
        className="w-full border p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your letter here..."
      />
      <div className="flex gap-2 flex-wrap">
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(+e.target.value)}
          className="border p-1 w-24"
        />
        <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border p-1 w-32"
        >
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="monospace">Monospace</option>
        </select>
        <input
          type="text"
          placeholder="Date (e.g. 2025-06-05)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-1 w-48"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
      <PaperScene text={text} fontSize={fontSize} fontColor={fontColor} fontFamily={fontFamily} />
    </div>
  );
}
