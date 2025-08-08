"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function forgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleForgotPass = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      setMessage(message); // Success message from backend
    } catch (error: any) {
      setError(true);
      console.error("Password Updation failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password</h1>
      <div className="flex flex-col gap-4 mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleForgotPass} // Call the function on button click
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </div>

      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
