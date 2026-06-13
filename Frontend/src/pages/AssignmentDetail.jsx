import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const { data } = await API.get(`/assignments/${id}`);
        setAssignment(data);
      } catch (err) {
        setError("Assignment not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await API.post(`/assignments/submit/${id}`, {
        file: "Submitted via portal"
      });
      setSubmitted(true);
      alert("Assignment submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="detail-card">
            <h2>Loading assignment...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!assignment) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="detail-card">
            <h2>Assignment not found</h2>
            <p>{error}</p>
            <button className="primary-btn" onClick={() => navigate("/assignments")}>Back to Assignments</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <button className="back-btn" onClick={() => navigate("/assignments")}>← Back to Assignments</button>

        <div className="detail-card">
          <div className="detail-header">
            <div>
              <h1>{assignment.title}</h1>
              <p className="detail-meta">Course: {assignment.course?.title || "General"}</p>
            </div>
            <span className={`status-pill ${submitted || assignment.submissions?.length ? "status-completed" : "status-pending"}`}>
              {submitted || assignment.submissions?.length ? "Submitted" : "Pending"}
            </span>
          </div>

          <p className="detail-description">{assignment.description}</p>

          <button
            className="primary-btn"
            onClick={handleSubmit}
          >
            Submit Assignment
          </button>
        </div>
      </div>
    </>
  );
}

export default AssignmentDetail;
