import React, { useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";

const JobDetails = ({ setCurrentView }) => {
  const jobSteps = [
    {
      step: "Unavailable Codes",
      startTime: "10:00 AM",
      duration: "1 min",
      status: "Completed",
    },
    {
      step: "Groups",
      startTime: "10:01 AM",
      duration: "2 min",
      status: "Completed",
    },
    {
      step: "Teams",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Compaigns",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Dispositions",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Agents",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Routing Attributes",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Scripts",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Skills",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Skills Agent Assignments",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Hours of Operation",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Workflow Data",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Address Books",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
    {
      step: "Points Of Contact",
      startTime: "10:03 AM",
      duration: "1 min",
      status: "Error",
    },
  ];

  // 🔹 Pagination Setup
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobSteps.length / itemsPerPage);

  // 🔹 Paginated Data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, jobSteps.length);
  const displayedSteps = jobSteps.slice(startIndex, endIndex);

  return (
    <div className="card shadow p-4">
      <Button
        variant="link"
        onClick={() => setCurrentView("jobTable")}
        className="p-0 pb-3 border-0 text-dark d-flex align-items-center"
        style={{ textDecoration: "none", fontSize: "1rem" }}
      >
        <i className="bi bi-arrow-left" style={{ fontSize: "1.2rem" }}></i>
        <span style={{ fontSize: "0.9rem", marginLeft: "5px" }}>Back</span>
      </Button>

      <h4>Job Details</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Step</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedSteps.map((step, index) => (
            <tr key={index}>
              <td>{step.step}</td>
              <td>{step.startTime}</td>
              <td>{step.duration}</td>
              <td>
                {step.status === "Error" ? (
                  <Button
                    variant="danger"
                    onClick={() => setCurrentView("errorDetails")}
                  >
                    View Error
                  </Button>
                ) : (
                  step.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 🔹 Pagination */}
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

export default JobDetails;
