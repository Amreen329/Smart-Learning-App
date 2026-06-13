import { useNavigate } from "react-router-dom";

function JobCard({ job, applyJob }) {
  const navigate = useNavigate();

  return (
    <div className="card">

      <h3>{job.company}</h3>

      <h4>{job.role}</h4>

      <p>{job.description}</p>

      <div className="card-actions">
        <button onClick={() => applyJob(job._id)}>
          Apply
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          View Details
        </button>
      </div>

    </div>
  );
}

export default JobCard;