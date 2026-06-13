import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import API from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");
        setJobs(data);
      } catch (err) {
        setError("Could not load jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    try {
      await API.post(`/jobs/apply/${jobId}`);
      alert("Application submitted successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Application failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Placement Opportunities</h1>
            <p>Apply for available jobs and boost your career.</p>
          </div>
        </div>

        {error && <p className="page-error">{error}</p>}

        {!loading && jobs.length === 0 && (
          <p className="page-error">No job opportunities are available right now.</p>
        )}

        <div className="card-grid">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div className="glass-card loading-card" key={index} />
              ))
            : jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  applyJob={applyJob}
                />
              ))}
        </div>

      </div>
    </>
  );
}

export default Jobs;