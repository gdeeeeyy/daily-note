"use client";

export default function EpubPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <h1 className="text-xl font-semibold mb-4">Open Book</h1>
      
      <a
        href="/books/thenotebook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
      >
        📖 Open PDF
      </a>
    </div>
  );
}
