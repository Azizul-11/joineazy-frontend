import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiExternalLink, FiPlusCircle } from "react-icons/fi";

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    link: "",
  });
  const [editing, setEditing] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/assignments/${editing}`, form);
        toast.success("Assignment updated");
      } else {
        await api.post("/assignments", form);
        toast.success("Assignment created");
      }
      setForm({ title: "", description: "", dueDate: "", link: "" });
      setEditing(null);
      fetchAssignments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving assignment");
    }
  };

  const handleEdit = (a) => {
    setForm({
      title: a.title,
      description: a.description,
      dueDate: a.dueDate.split("T")[0],
      link: a.link,
    });
    setEditing(a._id);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        <span >📝</span> Manage Assignments
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8 max-w-lg shadow-lg space-y-4"
      >
        <div>
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Due Date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">OneDrive Link</label>
          <input
            type="text"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            required
            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white py-2 rounded-lg font-semibold"
        >
          {editing ? <FiEdit2 /> : <FiPlusCircle />}
          {editing ? "Update Assignment" : "Create Assignment"}
        </button>
      </form>

      {/* Assignment List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assignments.map((a) => (
          <div
            key={a._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white">{a.title}</h3>
            <p className="text-gray-300 mt-2 text-sm">{a.description}</p>
            <p className="text-sm text-gray-400 mt-3">
              📅 Due: {new Date(a.dueDate).toLocaleDateString()}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
              >
                <FiExternalLink /> Link
              </a>
              <button
                onClick={() => handleEdit(a)}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
              >
                <FiEdit2 /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAssignments;
