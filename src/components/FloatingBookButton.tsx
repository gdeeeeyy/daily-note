"use client";

export default function FloatingBookButton() {
  const openPdf = () => {
    // On phones, this will open in the PDF viewer app
    window.open("/books/thenotebook.pdf", "_blank");
  };

  return (
    <button
      onClick={openPdf}
      className="fixed top-4 left-4 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700 transition"
    >
      Sneak Out Now!
    </button>

  );
}
