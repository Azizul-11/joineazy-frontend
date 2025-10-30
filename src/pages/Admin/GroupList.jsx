import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FiUsers } from "react-icons/fi";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);
    } catch {
      toast.error("Failed to load groups");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        <FiUsers className="inline mr-2" /> All Groups
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div
            key={g._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-white mb-1">{g.name}</h3>
            <p className="text-sm text-gray-400 mb-3">
              Created by: {g.createdBy?.name} ({g.createdBy?.email})
            </p>
            <ul className="text-gray-200 text-sm space-y-1">
              {g.members.map((m) => (
                <li key={m._id}>
                  {m.name} — <span className="text-indigo-300">{m.email}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsList;
