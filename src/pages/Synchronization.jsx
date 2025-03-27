import React, { useState } from "react";
import { Button, Modal, ProgressBar, Alert, Form } from "react-bootstrap";
import JobTable from "./JobTable";
import JobDetails from "./JobDetails";
import ErrorDetails from "./ErrorDetails";

const SyncPopup = ({ show, onClose }) => {
  const steps = [
    "Step 1: Validate Data",
    "Step 2: Fetch Records",
    "Step 3: Check Permissions",
    "Step 4: Sync Users",
    "Step 5: Sync Orders",
    "Step 6: Sync Inventory",
    "Step 7: Update Metadata",
    "Step 8: Validate Sync Data",
    "Step 9: Apply Business Rules",
    "Step 10: Commit Transactions",
    "Step 11: Final Verification",
    "Step 12: Generate Reports",
    "Step 13: Complete Sync",
  ];

  const [selectedSteps, setSelectedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [progress, setProgress] = useState(0);
  const [syncCompleted, setSyncCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [lastSyncDate, setLastSyncDate] = useState(null);

  const handleCheck = (step) => {
    setSelectedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const handleCheckAll = () => {
    setSelectedSteps(selectedSteps.length === steps.length ? [] : [...steps]);
  };

  const handleRunJob = async () => {
    setError(null);
    setSyncCompleted(false);
    let completedSteps = 0;

    for (let step of selectedSteps) {
      setCurrentStep(step);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      completedSteps++;

      if (Math.random() < 0.1) {
        setError(`Error at "${step}"`);
        setCurrentStep(null);
        return;
      }

      setProgress(Math.round((completedSteps / selectedSteps.length) * 100));
    }

    setCurrentStep(null);
    setSyncCompleted(true);
    setLastSyncDate(new Date().toLocaleString());
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

        {/* Progress Bar */}
        {currentStep && (
          <div className="mt-3">
            <strong>Running:</strong> {currentStep}
            <ProgressBar now={progress} label={`${progress}%`} animated />
          </div>
        )}

        {/* Last Sync Date */}
        {syncCompleted && lastSyncDate && (
          <Alert variant="info" className="mt-3">
            ✅ Sync completed successfully! <br />
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
          variant="success"
          onClick={handleRunJob}
          disabled={selectedSteps.length === 0 || currentStep !== null}
        >
          Run Job
        </Button>
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
