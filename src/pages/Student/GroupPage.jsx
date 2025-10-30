import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FiUserPlus, FiUsers } from "react-icons/fi";

const GroupPage = () => {
  const [group, setGroup] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    try {
      const { data } = await api.get("/groups/my");
      setGroup(data);
    } catch {
      setGroup(null);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/groups", { name: groupName });
      toast.success("Group created successfully");
      fetchGroup();
      setGroupName("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating group");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberEmail) return toast.warn("Enter member email");
    try {
      await api.put(`/groups/${group._id}/add`, { email: newMemberEmail });
      toast.success("Member added successfully");
      fetchGroup();
      setNewMemberEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding member");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        👥 My Group
      </h2>

      {group ? (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
          <p className="font-semibold text-xl mb-2 text-white">{group.name}</p>
          <p className="text-gray-300 mb-3">
            Members ({group.members.length}):
          </p>

          <ul className="text-gray-200 space-y-1 mb-4">
            {group.members.map((m) => (
              <li key={m._id}>
                {m.name} — <span className="text-indigo-300">{m.email}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={handleAddMember} className="flex gap-2 mt-4">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="Add member email"
              className="flex-1 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-linear-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FiUserPlus /> Add
            </button>
          </form>
        </div>
      ) : (
        <form
          onSubmit={handleCreateGroup}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg max-w-md"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Create New Group</h3>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name"
            required
            className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg mb-3 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-green-500 to-emerald-400 hover:opacity-90 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            {loading ? "Creating..." : <> <FiUsers /> Create Group </>}
          </button>
        </form>
      )}
    </div>
  );
};

export default GroupPage;
