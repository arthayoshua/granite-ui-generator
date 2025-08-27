"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState("Salin Kode");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedCode("");
    setError(null);
    setCopyButtonText("Salin Kode");

    try {
      const response = await fetch("/api/generate-component", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Gagal mendapatkan kode dari API.");
      }

      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100 text-gray-800">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">UI Component Generator</h1>
        <p className="text-center text-lg mb-8">Masukkan deskripsi komponen yang Anda inginkan, dan AI akan menghasilkan kodenya untuk Anda.</p>

        <form onSubmit={handleSubmit} className="w-full mb-8">
          <textarea
            className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors transform hover:scale-101"
            rows="6"
            placeholder="Misalnya: Buat komponen kartu produk dengan gambar, judul, deskripsi, dan harga."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          ></textarea>
          <button type="submit" className="w-full mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400" disabled={isLoading}>
            {isLoading ? "Membuat Kode..." : "Buat Kode"}
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-400 rounded-full animate-spin border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {generatedCode && (
          <div className="relative bg-gray-800 rounded-lg p-6 overflow-x-auto shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-white">Kode yang Dihasilkan:</h2>
            <SyntaxHighlighter language="jsx" style={dracula}>
              {generatedCode}
            </SyntaxHighlighter>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedCode);
                setCopyButtonText("Tersalin!");
                setTimeout(() => setCopyButtonText("Salin Kode"), 2000);
              }}
              className="absolute top-4 right-4 py-1 px-3 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors text-sm"
            >
              {copyButtonText}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
