import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.get(`/jobs/${id}`);
        setJob(data);
      } catch (err) {
        setError("Job not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      await API.post(`/jobs/apply/${id}`);
      setApplied(true);
      alert("Your application has been submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Application failed.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="detail-card">
            <h2>Loading job details...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <div className="detail-card">
            <h2>Job not found</h2>
            <p>{error}</p>
            <button className="primary-btn" onClick={() => navigate("/jobs")}>Back to Jobs</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container">
        <button className="back-btn" onClick={() => navigate("/jobs")}>← Back to Jobs</button>

        <div className="detail-card">
          <div className="detail-header">
            <div>
              <h1>{job.role}</h1>
              <p className="detail-meta">Company: {job.company} • {job.location}</p>
            </div>
            <span className={`status-pill ${applied ? "status-completed" : "status-pending"}`}>
              {applied ? "Applied" : "Open"}
            </span>
          </div>

          <p className="detail-description">{job.description}</p>

          <button
            className="primary-btn"
            onClick={handleApply}
          >
            Submit Application
          </button>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
