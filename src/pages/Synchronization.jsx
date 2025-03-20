import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startJob, completeJob } from "../redux/syncSlice";
import { FaSync, FaCheckCircle } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Synchronization.css"; // ✅ Custom Styling

const SynchronizationPage = () => {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.sync);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [disabledJobs, setDisabledJobs] = useState(
    jobs.slice(1).map((job) => job.id)
  ); // ✅ Only first job is enabled initially
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [lastSyncTimes, setLastSyncTimes] = useState({});
  const jobListRef = useRef(null);

  // ✅ Handle Checkbox Selection with Dependency Management
  const handleCheckboxChange = (jobId, index) => {
    if (selectedJobs.includes(jobId)) {
      // ✅ Unchecking a job -> Uncheck & disable all dependent jobs below it
      const jobsToDeselect = jobs.slice(index).map((job) => job.id);
      setSelectedJobs((prev) =>
        prev.filter((id) => !jobsToDeselect.includes(id))
      );

      // ✅ Keep Job #1 always enabled
      if (index === 0) {
        setDisabledJobs(jobs.slice(1).map((job) => job.id));
      } else {
        setDisabledJobs((prev) => [...prev, ...jobsToDeselect]);
      }
    } else {
      // ✅ Checking a job -> Enable the next dependent job
      setSelectedJobs((prev) => [...prev, jobId]);
      setDisabledJobs((prev) =>
        prev.filter((id) => id !== jobs[index + 1]?.id)
      ); // Enable the next job if exists
    }
  };

  // ✅ Scroll to the currently executing job
  const scrollToExecutingJob = (jobId) => {
    const jobElement = document.getElementById(`job-${jobId}`);
    if (jobElement) {
      jobElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ✅ Start Synchronization Process
  const startSync = () => {
    if (selectedJobs.length === 0) {
      alert("Please select at least one job to start synchronization!");
      return;
    }

    // ✅ Check if some selected jobs were already completed
    const alreadyCompletedJobs = selectedJobs.filter(
      (jobId) => jobs.find((job) => job.id === jobId).status === "Completed"
    );

    if (alreadyCompletedJobs.length > 0) {
      setPendingJobs(selectedJobs);
      setShowPopup(true);
      return;
    }

    runSync(selectedJobs);
  };

  // ✅ Function to execute the selected jobs
  const runSync = async (jobsToRun) => {
    setIsSyncing(true);
    setProgress({});

    for (let i = 0; i < jobsToRun.length; i++) {
      const jobId = jobsToRun[i];

      dispatch(startJob(jobId));

      let currentProgress = 0;
      while (currentProgress < 100) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate job delay
        currentProgress += 25;
        setProgress((prev) => ({ ...prev, [jobId]: currentProgress }));
        scrollToExecutingJob(jobId); // ✅ Scroll to currently executing job
      }

      dispatch(completeJob(jobId));

      // ✅ Update Last Sync Time
      setLastSyncTimes((prevTimes) => ({
        ...prevTimes,
        [jobId]: new Date().toLocaleString(),
      }));

      // ✅ Show a toast notification for job completion
      toast.success(
        `Job "${jobs.find((job) => job.id === jobId).name}" completed!`
      );
    }

    setIsSyncing(false);
    setShowPopup(false);

    // ✅ Final Toast after all jobs are done
    toast.success("All selected jobs completed successfully!");
  };

  return (
    <div className="sync-container w-100 h-100 p-4 shadow">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Header Section */}
      <div className="sync-header d-flex justify-content-between align-items-center">
        <h3 className="fw-bold">
          <FaSync
            className={`me-2 text-primary ${isSyncing ? "sync-animation" : ""}`}
          />
          Synchronization Process
        </h3>
        <button
          className="btn btn-primary"
          onClick={startSync}
          disabled={isSyncing || selectedJobs.length === 0} // ✅ Disable button if no job is selected
        >
          {isSyncing ? "Syncing..." : "Start Sync"}
        </button>
      </div>

      <hr className="border-2 border-dark" />

      {/* ✅ Job List with Scroll */}
      <div className="job-list-container" ref={jobListRef}>
        {jobs.map((job, index) => (
          <div key={job.id} id={`job-${job.id}`} className="job-item">
            {/* ✅ First Row (Job Number, Name & Status) */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span className="job-number me-3 fw-bold">{index + 1}.</span>{" "}
                {/* ✅ Job Number */}
                <input
                  type="checkbox"
                  checked={selectedJobs.includes(job.id)}
                  onChange={() => handleCheckboxChange(job.id, index)}
                  disabled={
                    isSyncing || (index !== 0 && disabledJobs.includes(job.id))
                  } // ✅ First job always enabled
                />
                <span className="job-name ms-2">{job.name}</span>
              </div>

              {/* ✅ Job Status */}
              <span
                className={`job-status ${job.status.toLowerCase()} text-end`}
              >
                {job.status === "Completed" ? (
                  <FaCheckCircle className="text-success" />
                ) : (
                  job.status
                )}
              </span>
            </div>

            {/* ✅ Second Row (Progress Bar) */}
            <div className="progress w-100 mt-2">
              <div
                className="progress-bar bg-success"
                style={{ width: `${progress[job.id] || 0}%` }}
              >
                {Math.round(progress[job.id] || 0)}%
              </div>
            </div>

            {/* ✅ Last Sync Time (Updated correctly per job) */}
            <div className="last-sync text-muted small mt-1">
              <strong>Last Sync:</strong> {lastSyncTimes[job.id] || "Never"}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Fancy Popup */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Re-run Completed Jobs?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Some selected jobs have already been completed. Do you want to re-run
          them?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowPopup(false);
              runSync(
                pendingJobs.filter(
                  (jobId) =>
                    jobs.find((job) => job.id === jobId).status !== "Completed"
                )
              );
            }}
          >
            No, Run Only New Jobs
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowPopup(false);
              runSync(pendingJobs);
            }}
          >
            Yes, Run All Selected Jobs
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SynchronizationPage;
