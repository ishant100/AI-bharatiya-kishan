import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

import heroImage from "@/assets/agriculture-hero.jpg";

export default function Signup() {


  useEffect(() => {
    console.log("ENV:", import.meta.env.VITE_BACKEND_URL);
  }, []);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
  e.preventDefault();

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );


    const data = await res.json();
    if (res.ok) {
      login(data.token);
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6faf7] relative overflow-hidden px-4">

      {/* BACKGROUND SHAPES */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-green-200 rounded-full opacity-60" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-amber-200 rounded-full opacity-60" />

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className="p-10">
          <h2 className="text-sm text-gray-500 mb-1">Get Started</h2>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create your <span className="text-green-700">Bharti Kisan AI</span> account
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Farmer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button className="w-full bg-green-700 hover:bg-green-800">
              Create Account
            </Button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-medium">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-700 p-8 text-white">
          <img
            src={heroImage}
            alt="Agriculture"
            className="w-full max-w-sm rounded-lg mb-6"
          />

          <h2 className="text-xl font-semibold mb-2">
            Digital Agriculture Assistant
          </h2>

          <p className="text-sm text-green-100 text-center">
            Helping farmers grow smarter with AI.
          </p>
        </div>
      </div>
    </div>
  );
}
