const fs = require("fs");
const path = require("path");
const { Resend } = require("resend");

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to read and replace placeholders in the HTML template
const renderTemplate = (templatePath, replacements) => {
  let template = fs.readFileSync(templatePath, "utf-8");
  for (const [key, value] of Object.entries(replacements)) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return template;
};

// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Send admin notification email
const sendAdminNotification = async (feedback, userEmail) => {
  const date = new Date().toLocaleDateString();
  const html = renderTemplate(
    path.join(__dirname, "../views/admin_feedback_notification.html"),
    {
      feedbackContent: feedback.content,
      feedbackRating: feedback.rating,
      userEmail: userEmail,
      feedbackDate: date,
    }
  );
  await sendEmail("mohid.anwar@gmail.com", "New Feedback Received", html);
};

// Send thank you email to the user
const sendUserThankYou = async (userEmail, feedback) => {
  const html = renderTemplate(
    path.join(__dirname, "../views/user_feedback_thank_you.html"),
    {
      feedbackContent: feedback.content,
      feedbackRating: feedback.rating,
    }
  );
  await sendEmail(userEmail, "Thank You for Your Feedback", html);
};

module.exports = {
  sendAdminNotification,
  sendUserThankYou,
};
