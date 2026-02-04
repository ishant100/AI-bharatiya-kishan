import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

import heroImage from "@/assets/agriculture-hero.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.token);
      navigate("/chat");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6faf7] relative overflow-hidden px-4">

      {/* BACKGROUND SHAPES */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-green-200 rounded-full opacity-60" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-amber-200 rounded-full opacity-60" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT – FORM */}
        <div className="p-10">
          <h2 className="text-sm text-gray-500 mb-1">Welcome</h2>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Log in to <span className="text-green-700">Bharti Kisan AI</span>
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="farmer@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button className="w-full bg-green-700 hover:bg-green-800">
              Login
            </Button>
          </form>

          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-700 p-8 text-white">
          <img
            src={heroImage}
            alt="Agriculture"
            className="w-full max-w-sm rounded-lg mb-6"
          />

          <h2 className="text-xl font-semibold mb-2">
            Smart Farming Starts Here
          </h2>

          <p className="text-sm text-green-100 text-center">
            AI-powered crop advisory, weather insights, and fair market prices.
          </p>
        </div>
      </div>
    </div>
  );
}
