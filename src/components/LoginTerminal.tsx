"use client";

import { useState } from "react";

type LoginTerminalProps = {
  onLogin: (role: "Krishna" | "Hemthiii") => void;
};

export default function LoginTerminal({ onLogin }: LoginTerminalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const u = username.trim().toLowerCase();
    const p = password.trim();
    if (u === "Krishna" && p === "sunflower") {
      onLogin("Krishna");
    } else if (u === "Hemthiii" && p === "sunshine") {
      onLogin("Hemthiii");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col max-w-sm w-full p-6 border rounded shadow-md bg-white text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <label className="mb-2 font-semibold" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="admin or guest"
      />

      <label className="mb-2 font-semibold" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="1234 or 5678"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Login
      </button>
    </div>
  );
}
