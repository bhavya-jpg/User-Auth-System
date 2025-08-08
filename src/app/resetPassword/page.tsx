"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]; // Extract token from "?token=abc123"
    setToken(urlToken || "");
  }, []);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("/api/users/resetPassword", {
        token,
        password,
      });
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password</h1>
      <div className="flex flex-col gap-4 mt-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleResetPassword}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </div>

      {message && <p className="mt-4 text-green-500">{message}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}
