import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FiCheckCircle } from "react-icons/fi";

const Submission = () => {
  const [assignments, setAssignments] = useState([]);
  const [group, setGroup] = useState(null);
  const [submitted, setSubmitted] = useState({});

  const fetchData = async () => {
    try {
      const [assignRes, groupRes] = await Promise.all([
        api.get("/assignments"),
        api.get("/groups/my"),
      ]);
      setAssignments(assignRes.data);
      setGroup(groupRes.data);
    } catch {
      toast.error("Failed to fetch data");
    }
  };

  const checkSubmission = async (assignmentId) => {
    try {
      const { data } = await api.get(`/submissions/my/${assignmentId}`);
      setSubmitted((prev) => ({ ...prev, [assignmentId]: data.isSubmitted }));
    } catch {
      setSubmitted((prev) => ({ ...prev, [assignmentId]: false }));
    }
  };

  const handleSubmitConfirm = async (assignmentId) => {
    if (!group) return toast.error("You must have a group to submit");
    try {
      await api.post("/submissions/confirm", {
        assignmentId,
        groupId: group._id,
      });
      toast.success("Submission confirmed!");
      checkSubmission(assignmentId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    assignments.forEach((a) => checkSubmission(a._id));
  }, [assignments]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        📤 Submission Status
      </h2>

      <div className="space-y-4">
        {assignments.map((a) => (
          <div
            key={a._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 flex justify-between items-center shadow-md hover:shadow-lg transition-all"
          >
            <div>
              <h3 className="font-semibold text-white">{a.title}</h3>
              <p className="text-sm text-gray-400">
                Due: {new Date(a.dueDate).toLocaleDateString()}
              </p>
            </div>

            {submitted[a._id] ? (
              <span className="text-green-400 font-semibold flex items-center gap-1">
                <FiCheckCircle /> Submitted
              </span>
            ) : (
              <button
                onClick={() => handleSubmitConfirm(a._id)}
                className="bg-linear-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium"
              >
                Confirm Submission
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submission;
