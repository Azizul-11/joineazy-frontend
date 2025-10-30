import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FiBarChart2 } from "react-icons/fi";

const Analytics = () => {
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/submissions/analytics");
      setStats(data);
    } catch {
      toast.error("Failed to load analytics");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        <FiBarChart2 className="inline mr-2" /> Submission Analytics
      </h2>

      {stats.length === 0 ? (
        <p className="text-gray-400">No submission data yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s._id._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {s._id.title}
              </h3>
              <p className="text-gray-400 text-sm">
                📅 Due: {new Date(s._id.dueDate).toLocaleDateString()}
              </p>
              <p className="mt-3 font-semibold text-green-400">
                ✅ Submissions: {s.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics;
