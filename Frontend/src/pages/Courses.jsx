import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get("/courses");
        setCourses(data);
      } catch (err) {
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      await API.post(`/courses/enroll/${courseId}`);
      alert("You have been enrolled successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="hero-section">
          <div className="hero-overlay">
            <h1>Courses</h1>
            <p>Explore and enroll in the latest technical programs.</p>
          </div>
        </div>

        {error && <p className="page-error">{error}</p>}

        {!loading && courses.length === 0 && (
          <p className="page-error">No courses available right now. Please check back soon.</p>
        )}

        <div className="card-grid">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div className="glass-card loading-card" key={index} />
              ))
            : courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  enrollCourse={enrollCourse}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default Courses;