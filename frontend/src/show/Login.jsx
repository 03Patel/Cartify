import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("authToken", json.authToken);

        navigate("/");


      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong!");
    }



    console.log("User Logged In ✅:", formData);
    setError("");
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-emerald-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
        <p className="text-center text-gray-500">Login to Cartify</p>

        {error && (
          <div className="p-2 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/createuser")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login