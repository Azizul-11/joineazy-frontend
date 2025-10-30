// src/pages/Student/Dashboard.jsx
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiUsers, FiBook, FiCheckCircle, FiLogOut } from "react-icons/fi";
import GroupPage from "./GroupPage";
import Assignments from "./Assignments";
import Submission from "./Submission";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/student", label: "My Group", icon: <FiUsers /> },
    { path: "/student/assignments", label: "Assignments", icon: <FiBook /> },
    { path: "/student/submission", label: "Submissions", icon: <FiCheckCircle /> },
  ];

  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Student Panel
          </h1>

          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-300 mb-3">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/80 hover:bg-red-600 transition-all text-white py-2 rounded-lg font-semibold"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<GroupPage />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/submission" element={<Submission />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
