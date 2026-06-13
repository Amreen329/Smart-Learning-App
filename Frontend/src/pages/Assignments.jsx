import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AssignmentCard from "../components/AssignmentCard";
import API from "../services/api";

function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const { data } = await API.get("/assignments");
        setAssignments(data);
      } catch (err) {
        setError("Could not load assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const submitAssignment = async (assignmentId) => {
    try {
      await API.post(`/assignments/submit/${assignmentId}`, {
        file: "Submitted through student portal"
      });
      alert("Assignment submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Assignments</h1>
            <p>Submit and track your learning tasks with ease.</p>
          </div>
        </div>

        {error && <p className="page-error">{error}</p>}

        {!loading && assignments.length === 0 && (
          <p className="page-error">No assignments are available at the moment.</p>
        )}

        <div className="card-grid">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div className="glass-card loading-card" key={index} />
              ))
            : assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  submitAssignment={submitAssignment}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default Assignments;