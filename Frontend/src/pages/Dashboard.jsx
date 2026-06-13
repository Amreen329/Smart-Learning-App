import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import {
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaBriefcase,
  FaChartLine
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [assignmentsList, setAssignmentsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, coursesRes, assignmentsRes, jobsRes] = await Promise.all([
          API.get("/dashboard"),
          API.get("/courses"),
          API.get("/assignments"),
          API.get("/jobs"),
        ]);

        setStats(statsRes.data);
        setCourses(coursesRes.data.slice(0, 3));
        setAssignmentsList(assignmentsRes.data.slice(0, 3));
        setJobsList(jobsRes.data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-container">

        {/* Hero Section */}
        <div className="hero-section">

          <div className="hero-overlay">

            <h1>
              Smart Student Learning &
              Placement Management System
            </h1>

            <p>
              Learn • Practice • Track Progress • Get Placed
            </p>

            <button
              className="explore-btn"
              onClick={() => window.location.assign("/courses")}
            >
              Explore Courses
            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="stats-grid">

          {loading ? (
            <div className="glass-card">
              <p>Loading statistics...</p>
            </div>
          ) : (
            <>
              <div className="glass-card">
                <FaUserGraduate />
                <h2>{stats?.students ?? 0}</h2>
                <p>Students</p>
              </div>

              <div className="glass-card">
                <FaBook />
                <h2>{stats?.courses ?? 0}</h2>
                <p>Courses</p>
              </div>

              <div className="glass-card">
                <FaClipboardList />
                <h2>{stats?.trainers ?? 0}</h2>
                <p>Trainers</p>
              </div>

              <div className="glass-card">
                <FaBriefcase />
                <h2>{stats?.jobs ?? 0}</h2>
                <p>Jobs</p>
              </div>
            </>
          )}

        </div>

        {/* Featured Resources */}

        <div className="section-grid">
          <div className="preview-section">
            <div className="section-header">
              <h2>Top Courses</h2>
              <button className="secondary-btn" onClick={() => window.location.assign("/courses")}>View All</button>
            </div>
            <div className="preview-grid">
              {courses.length === 0 ? (
                <div className="glass-card">No courses available.</div>
              ) : (
                courses.map((course) => (
                  <div key={course._id} className="preview-card">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button className="primary-btn" onClick={() => window.location.assign("/courses")}>Browse Courses</button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="preview-section">
            <div className="section-header">
              <h2>Recent Assignments</h2>
              <button className="secondary-btn" onClick={() => window.location.assign("/assignments")}>View All</button>
            </div>
            <div className="preview-grid">
              {assignmentsList.length === 0 ? (
                <div className="glass-card">No assignments available.</div>
              ) : (
                assignmentsList.map((assignment) => (
                  <div key={assignment._id} className="preview-card">
                    <h3>{assignment.title}</h3>
                    <p>{assignment.description}</p>
                    <button className="primary-btn" onClick={() => window.location.assign(`/assignments/${assignment._id}`)}>View Assignment</button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="preview-section">
            <div className="section-header">
              <h2>Latest Jobs</h2>
              <button className="secondary-btn" onClick={() => window.location.assign("/jobs")}>View All</button>
            </div>
            <div className="preview-grid">
              {jobsList.length === 0 ? (
                <div className="glass-card">No jobs available.</div>
              ) : (
                jobsList.map((job) => (
                  <div key={job._id} className="preview-card">
                    <h3>{job.role}</h3>
                    <p>{job.company} • {job.location}</p>
                    <button className="primary-btn" onClick={() => window.location.assign(`/jobs/${job._id}`)}>View Job</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Analytics */}

        <div className="dashboard-row">

          <div className="activity-card">

            <h2>
              <FaChartLine />
              Recent Activities
            </h2>

            <ul>
              <li>Completed React Assignment</li>
              <li>Applied for TCS Internship</li>
              <li>Enrolled in MERN Course</li>
              <li>Scored 90% in Assessment</li>
            </ul>

          </div>

          <div className="activity-card">

            <h2>Upcoming Tasks</h2>

            <ul>
              <li>Node.js Assignment - June 15</li>
              <li>Mock Interview - June 18</li>
              <li>Placement Drive - June 20</li>
            </ul>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;