import React, { useState } from "react";
import { Button, Table, Form, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { startJob, completeJob } from "../redux/syncSlice"; // Import Redux actions

const JobTable = ({ setCurrentView }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.sync.jobs); // Fetch jobs from Redux store

  // ✅ Filters
  const [filterStatus, setFilterStatus] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [filterJobStart, setFilterJobStart] = useState("");

  // ✅ Apply Filters
  const filteredJobs = jobs.filter(
    (job) =>
      (filterStatus === "" || job.status.includes(filterStatus)) &&
      (filterJobType === "" || job.type.includes(filterJobType)) &&
      (filterJobStart === "" || job.start.includes(filterJobStart))
  );

  // ✅ Pagination Setup
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredJobs.length); // Prevent extra items
  const displayedJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className="card shadow p-4">
      <h4>Job List</h4>

      {/* ✅ Filters */}
      <div className="row mb-3">
        <div className="col-md-4">
          <Form.Control
            type="text"
            placeholder="Filter by Job Type"
            value={filterJobType}
            onChange={(e) => setFilterJobType(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Form.Control
            type="text"
            placeholder="Filter by Job Start"
            value={filterJobStart}
            onChange={(e) => setFilterJobStart(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Error">Error</option>
          </Form.Select>
        </div>
      </div>

      {/* ✅ Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Type</th>
            <th>Job Start</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.type}</td>
              <td>{job.start}</td>
              <td>{job.duration}</td>
              <td>
                <span
                  className={`badge ${
                    job.status === "Completed"
                      ? "bg-success"
                      : job.status === "Error"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td>
                {job.status === "Completed" || job.status === "In Progress" ? (
                  <Button
                    variant="primary"
                    onClick={() => setCurrentView("jobDetails")}
                  >
                    View Details
                  </Button>
                ) : job.status === "In Progress" ? (
                  <Button
                    variant="success"
                    onClick={() => dispatch(completeJob(job.id))}
                  >
                    Complete
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setCurrentView("jobDetails")}
                  >
                    View Details
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Pagination */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default JobTable;
