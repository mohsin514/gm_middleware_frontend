import React from "react";
import { Button, Card } from "react-bootstrap";

const ErrorDetails = ({ setCurrentView }) => {
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh", // Full height but no overflow beyond screen
        maxWidth: "100vw", // Prevents horizontal scrolling
        overflow: "hidden", // Prevents outer scroll
      }}
    >
      {/* Header + Back Button (Fixed) */}
      <div className="p-3 shadow-sm bg-white">
        <Button
          variant="link"
          onClick={() => setCurrentView("jobTable")}
          className="p-0 border-0 text-dark d-flex align-items-center"
          style={{ textDecoration: "none", fontSize: "1rem" }}
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "1.2rem" }}></i>
          <span style={{ fontSize: "0.9rem", marginLeft: "5px" }}>Back</span>
        </Button>
        <h4 className="mt-2">Error Details</h4>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-grow-1 overflow-auto p-3"
        style={{
          background: "#f8f9fa",
          maxHeight: "calc(100vh - 60px)", // Prevents going beyond the screen
        }}
      >
        <Card className="p-3">
          <p>
            <strong>Endpoint:</strong> /teams?q=12345
          </p>
          <p>
            <strong>Method:</strong> POST
          </p>
          <p>
            <strong>HTTP Status Code:</strong> 409
          </p>
          <p>
            <strong>HTTP Status Description:</strong> Invalid Permissions
          </p>

          <h5>Request:</h5>
          <pre className="p-2 bg-light rounded">
            {`{
  "teams": [
    {
      "teamName": "string",
      "isActive": true
    }
  ]
}`}
          </pre>

          <h5>Response:</h5>
          <pre className="p-2 bg-light rounded">
            {`{
  "errorCount": 0,
  "results": [
    {
      "result": "string",
      "error": "string",
      "error_description": "string"
    }
  ]
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default ErrorDetails;
