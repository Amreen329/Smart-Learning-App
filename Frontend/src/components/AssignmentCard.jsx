import { useNavigate } from "react-router-dom";

function AssignmentCard({
  assignment,
  submitAssignment
}) {
  const navigate = useNavigate();

  return (
    <div className="card">

      <h3>{assignment.title}</h3>

      <p>{assignment.description}</p>

      <div className="card-actions">
        <button
          onClick={() => submitAssignment(assignment._id)}
        >
          Submit Assignment
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate(`/assignments/${assignment._id}`)}
        >
          View Details
        </button>
      </div>

    </div>
  );
}

export default AssignmentCard;