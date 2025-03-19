import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Button, Spinner } from "react-bootstrap";
import {
  FaSearch,
  FaSync,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaRedo,
} from "react-icons/fa";

const SyncLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const logsPerPage = 5;

  // Dummy Data for Logs (Simulating API Fetch)
  const fetchLogs = () => {
    setLoading(true);
    setTimeout(() => {
      setLogs([
        {
          id: 1,
          process: "Sync Users",
          status: "Completed",
          time: "2024-03-18 12:30",
        },
        {
          id: 2,
          process: "Sync Orders",
          status: "Failed",
          time: "2024-03-18 12:45",
        },
        {
          id: 3,
          process: "Sync Inventory",
          status: "Completed",
          time: "2024-03-18 13:00",
        },
        {
          id: 4,
          process: "Sync Payments",
          status: "Pending",
          time: "2024-03-18 13:15",
        },
        {
          id: 5,
          process: "Sync Reports",
          status: "Completed",
          time: "2024-03-18 13:30",
        },
        {
          id: 6,
          process: "Sync Users",
          status: "Pending",
          time: "2024-03-18 14:00",
        },
        {
          id: 7,
          process: "Sync Orders",
          status: "Completed",
          time: "2024-03-18 14:15",
        },
        {
          id: 8,
          process: "Sync Inventory",
          status: "Failed",
          time: "2024-03-18 14:30",
        },
        {
          id: 9,
          process: "Sync Payments",
          status: "Completed",
          time: "2024-03-18 15:00",
        },
        {
          id: 10,
          process: "Sync Reports",
          status: "Failed",
          time: "2024-03-18 15:15",
        },
      ]);
      setLoading(false);
    }, 2000);
  };

  // Fetch Logs on First Load
  useEffect(() => {
    fetchLogs();
  }, []);

  // Filter & Search Logic
  const filteredLogs = logs.filter(
    (log) =>
      log.process.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "" || log.status === statusFilter)
  );

  // Pagination Logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-100 h-100 p-4 shadow bg-white">
      <h3 className="fw-bold d-flex align-items-center">
        <FaSync className="me-2 sync-animation" /> Synchronization Logs
      </h3>
      <p className="text-muted">
        View logs of recent synchronization processes.
      </p>
      <hr className="border-2 border-dark" />

      {/* ✅ Search, Filter & Reload Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group w-50">
          <span className="input-group-text bg-light">
            <FaSearch className="text-secondary" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by process name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Form.Select
          className="w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </Form.Select>

        <Button variant="primary" onClick={fetchLogs}>
          <FaRedo className="me-2" /> Reload Logs
        </Button>
      </div>

      {/* ✅ Loader */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Fetching logs...</p>
        </div>
      )}

      {/* ✅ Logs Table */}
      {!loading && (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Process</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.length > 0 ? (
                currentLogs.map((log, index) => (
                  <tr key={log.id} className="fade-in-animation">
                    <td>{indexOfFirstLog + index + 1}</td>
                    <td>{log.process}</td>
                    <td>
                      {log.status === "Completed" && (
                        <span className="text-success">
                          <FaCheckCircle className="me-1" />
                          Completed
                        </span>
                      )}
                      {log.status === "Pending" && (
                        <span className="text-warning">
                          <FaClock className="me-1" />
                          Pending
                        </span>
                      )}
                      {log.status === "Failed" && (
                        <span className="text-danger">
                          <FaTimesCircle className="me-1" />
                          Failed
                        </span>
                      )}
                    </td>
                    <td>{log.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      {/* ✅ Pagination */}
      {!loading && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination>
            {[...Array(Math.ceil(filteredLogs.length / logsPerPage))].map(
              (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default SyncLogs;
