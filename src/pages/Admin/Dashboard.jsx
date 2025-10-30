
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { FiBookOpen, FiUsers, FiBarChart2, FiLogOut } from "react-icons/fi";
import ManageAssignments from "./ManageAssignments";
import GroupsList from "./GroupList";
import Analytics from "./Analytics";
import api from "../../api/axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    assignments: 0,
    groups: 0,
    submissions: 0,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/admin", label: "Assignments", icon: <FiBookOpen /> },
    { path: "/admin/groups", label: "Groups", icon: <FiUsers /> },
    { path: "/admin/analytics", label: "Analytics", icon: <FiBarChart2 /> },
  ];

  const fetchStats = async () => {
    try {
      const [assignmentsRes, groupsRes, analyticsRes] = await Promise.all([
        api.get("/assignments"),
        api.get("/groups"),
        api.get("/submissions/analytics"),
      ]);
      setStats({
        assignments: assignmentsRes.data.length,
        groups: groupsRes.data.length,
        submissions: analyticsRes.data.reduce((acc, s) => acc + s.total, 0),
      });
    } catch (err) {
      console.error("Error loading admin stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
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
        {/* Top Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-xl flex flex-col items-center shadow-md hover:shadow-lg transition-all">
            <FiBookOpen className="text-indigo-400 text-3xl mb-2" />
            <p className="text-lg font-semibold">Assignments</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.assignments}</p>
          </div>

          <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-xl flex flex-col items-center shadow-md hover:shadow-lg transition-all">
            <FiUsers className="text-purple-400 text-3xl mb-2" />
            <p className="text-lg font-semibold">Groups</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.groups}</p>
          </div>

          <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-xl flex flex-col items-center shadow-md hover:shadow-lg transition-all">
            <FiBarChart2 className="text-green-400 text-3xl mb-2" />
            <p className="text-lg font-semibold">Submissions</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.submissions}</p>
          </div>
        </div>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<ManageAssignments />} />
          <Route path="/groups" element={<GroupsList />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
