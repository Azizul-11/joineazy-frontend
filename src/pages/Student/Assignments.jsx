import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FiExternalLink } from "react-icons/fi";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const { data } = await api.get("/assignments");
      setAssignments(data);
    } catch {
      toast.error("Failed to fetch assignments");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        📚 Assignments
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assignments.map((a) => (
          <div
            key={a._id}
            className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white">{a.title}</h3>
            <p className="text-gray-300 mt-2 text-sm">{a.description}</p>
            <p className="text-sm text-gray-400 mt-3">
              📅 Due: {new Date(a.dueDate).toLocaleDateString()}
            </p>
            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <FiExternalLink /> Open OneDrive Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
