import React from "react";

const AdminFeedbackNotification = ({ feedback, userEmail, date }) => (
  <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
    <h2>New Feedback Received</h2>
    <p>
      <strong>Feedback Content:</strong> {feedback.content}
    </p>
    <p>
      <strong>Rating:</strong> {feedback.rating}
    </p>
    <p>
      <strong>Submitted By:</strong> {userEmail}
    </p>
    <p>
      <strong>Date:</strong> {date}
    </p>
  </div>
);

export default AdminFeedbackNotification;
