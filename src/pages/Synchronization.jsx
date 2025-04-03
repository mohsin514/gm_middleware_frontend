import React, { useState } from "react";
import { Button, Modal, ProgressBar, Alert, Form } from "react-bootstrap";
import JobTable from "./JobTable";
import JobDetails from "./JobDetails";
import ErrorDetails from "./ErrorDetails";

const SyncPopup = ({ show, onClose }) => {
  const steps = [
    "Step 1: Unavailable Codes",
    "Step 2: Groups",
    "Step 3: Teams",
    "Step 4: Campaigns",
    "Step 5: Dispositions",
    "Step 6: Agents",
    "Step 7: Routing Attributes",
    "Step 8: Scripts",
    "Step 9: Skills",
    "Step 10: Skills Agent Assignments",
    "Step 11: Hours Of Operation",
    "Step 12: Workflow Data",
    "Step 13: Address Books",
    "Step 14: Points Of Contact",
  ];

  const [selectedSteps, setSelectedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [lastSyncDate, setLastSyncDate] = useState(null);
  const [file, setFile] = useState(null);

  const handleCheck = (step) => {
    setSelectedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const handleCheckAll = () => {
    setSelectedSteps(selectedSteps.length === steps.length ? [] : [...steps]);
  };

  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64,PDF_DATA_HERE"; // Replace with your PDF data
    link.download = "sync_report.pdf";
    link.click();
  };

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Here you can implement the upload logic to send the file to the server
    }
  };

  const handleDownloadProgress = async () => {
    setDownloadCompleted(false);
    setDownloadProgress(0);
    let completedSteps = 0;

    for (let step of selectedSteps) {
      setCurrentStep(`Syncing: ${step}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      completedSteps++;

      if (Math.random() < 0.1) {
        setError(`Download failed at "${step}"`);
        setCurrentStep(null);
        return;
      }

      setDownloadProgress(
        Math.round((completedSteps / selectedSteps.length) * 100)
      );
    }

    setDownloadCompleted(true);
    setCurrentStep(null);
  };

  const handleUploadProgress = async () => {
    if (!downloadCompleted) {
      setError("Please complete the download before uploading.");
      return;
    }

    setError(null);
    setUploadCompleted(false);
    setUploadProgress(0);
    let completedSteps = 0;

    for (let step of selectedSteps) {
      setCurrentStep(`Uploading: ${step}`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      completedSteps++;

      if (Math.random() < 0.1) {
        setError(`Upload failed at "${step}"`);
        setCurrentStep(null);
        return;
      }

      setUploadProgress(
        Math.round((completedSteps / selectedSteps.length) * 100)
      );
    }

    setUploadCompleted(true);
    setLastSyncDate(new Date().toLocaleString());
    setCurrentStep(null);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>🔄 Manual Synchronization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Checkboxes */}
        <Form>
          <Form.Check
            type="checkbox"
            label="Check All"
            checked={selectedSteps.length === steps.length}
            onChange={handleCheckAll}
          />
          <hr />
          {steps.map((step, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={step}
              checked={selectedSteps.includes(step)}
              onChange={() => handleCheck(step)}
            />
          ))}
        </Form>

        {/* Progress Bar for Download */}
        {currentStep && currentStep.includes("Syncing") && (
          <div className="mt-3">
            <strong>{currentStep}</strong>
            <ProgressBar
              now={downloadProgress}
              label={`${downloadProgress}%`}
              animated
            />
          </div>
        )}

        {/* Progress Bar for Upload */}
        {currentStep && currentStep.includes("Uploading") && (
          <div className="mt-3">
            <strong>{currentStep}</strong>
            <ProgressBar
              now={uploadProgress}
              label={`${uploadProgress}%`}
              animated
            />
          </div>
        )}

        {/* Last Sync Date */}
        {uploadCompleted && lastSyncDate && (
          <Alert variant="info" className="mt-3">
            ✅ Upload completed successfully! <br />
            Last Sync: {lastSyncDate}
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="mt-3">
            ❌ {error}
          </Alert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleDownload}
          disabled={!downloadCompleted}
        >
          📥 Download PDF
        </Button>
        <Button
          variant="success"
          onClick={handleDownloadProgress}
          disabled={selectedSteps.length === 0 || currentStep !== null}
        >
          🔄 Run Sync Job
        </Button>
        <Button
          variant="info"
          onClick={() => document.getElementById("fileUpload").click()}
        >
          📤 Upload File
        </Button>
        <input
          id="fileUpload"
          type="file"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </Modal.Footer>
    </Modal>
  );
};

const Synchronization = () => {
  const [currentView, setCurrentView] = useState("jobTable"); // Default view
  const [showPopup, setShowPopup] = useState(false); // Manage popup state

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Synchronization Dashboard</h2>
        {/* ✅ Manual Run Sync Button */}
        <Button variant="success" onClick={() => setShowPopup(true)}>
          🔄 Manual Run Sync
        </Button>
      </div>

      {/* ✅ Conditionally Render Tables */}
      {currentView === "jobTable" && (
        <JobTable setCurrentView={setCurrentView} />
      )}
      {currentView === "jobDetails" && (
        <JobDetails setCurrentView={setCurrentView} />
      )}
      {currentView === "errorDetails" && (
        <ErrorDetails setCurrentView={setCurrentView} />
      )}

      {/* ✅ Manual Sync Popup */}
      <SyncPopup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default Synchronization;
