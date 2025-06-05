"use client";

import { useState } from "react"; // Removed unused useEffect
import PaperScene from "./PaperScene";
import { supabase } from "../lib/supabaseClient";

export default function PaperEditor() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontColor, setFontColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("serif");
  const [date, setDate] = useState("");

  const handleSave = async () => {
    const { data: latest } = await supabase
      .from("paper_content")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    const newId = latest?.id ? latest.id + 1 : 1;

    const { error } = await supabase.from("paper_content").insert({
      id: newId,
      text,
      font_size: fontSize,
      font_color: fontColor,
      font_family: fontFamily,
      date,
    });

    if (error) {
      console.error("Save failed:", error.message);
      alert("Save failed.");
    } else {
      alert("Saved successfully!");
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
      <div className="flex gap-2 flex-wrap items-center">
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(+e.target.value)}
          className="border p-1 w-20"
        />
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="border p-1"
        >
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="monospace">Monospace</option>
        </select>
        <input
          type="text"
          placeholder="Enter date (YYYY-MM-DD)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-1 w-40"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
      <PaperScene
        text={text}
        fontSize={fontSize}
        fontColor={fontColor}
        fontFamily={fontFamily}
        date={date}
      />
    </div>
  );
}
