import React, { useState } from "react";
import axios from "axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "signup";
    const payload = isLogin 
      ? { email, password } 
      : { email, password, displayName };
    
    try {
      const res = await axios.post(`http://localhost:4000/auth/${endpoint}`, payload);
      alert(res.data.msg);
      if (res.data.token) localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Display Name"
              className="p-2 rounded bg-gray-700"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-500 py-2 rounded hover:bg-green-600">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-blue-400 ml-2 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
