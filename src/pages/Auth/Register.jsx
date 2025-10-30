// src/pages/Auth/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiUserPlus, FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      login(data);
      toast.success("Account created successfully!");
      navigate(data.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-slate-900 to-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Join the platform to start collaborating!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-200 mb-1">Full Name</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <FiUser className="text-gray-300 mr-2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Email</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <FiMail className="text-gray-300 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <FiLock className="text-gray-300 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-300 hover:text-white ml-2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
  <label className="block text-sm text-gray-200 mb-1">Role</label>
  <div className="relative">
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full bg-white/20 text-white border border-white/30 rounded-lg px-3 py-2 
                 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none"
    >
      <option value="student" className="bg-gray-800 text-white">
        Student
      </option>
      <option value="admin" className="bg-gray-800 text-white">
        Admin (Professor)
      </option>
    </select>
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
      ▼
    </span>
  </div>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-green-500 to-emerald-400 hover:opacity-90 transition-all text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2"
          >
            {loading ? "Creating..." : <> <FiUserPlus /> Register </>}
          </button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
