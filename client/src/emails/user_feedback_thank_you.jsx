import React from "react";

const UserFeedbackThankYou = ({ feedback, rating }) => (
  <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
    <h2>Thank You for Your Feedback!</h2>
    <p>
      <strong>Your Feedback:</strong> {feedback}
    </p>
    <p>
      <strong>Your Rating:</strong> {rating} out of 5
    </p>
    <p>We appreciate your input and will use it to improve our services.</p>
  </div>
);

export default UserFeedbackThankYou;
