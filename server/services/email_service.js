// const fs = require("fs");
// const path = require("path");
// const { Resend } = require("resend");

// // Initialize Resend with your API key
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Function to read and replace placeholders in the HTML template
// const renderTemplate = (templatePath, replacements) => {
//   let template = fs.readFileSync(templatePath, "utf-8");
//   for (const [key, value] of Object.entries(replacements)) {
//     template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
//   }
//   return template;
// };

// // Function to send an email
// const sendEmail = async (to, subject, html) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: [to],
//       subject,
//       html,
//     });

//     if (error) {
//       console.error("Failed to send email:", error);
//     } else {
//       console.log("Email sent successfully:", data);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// // Send admin notification email
// const sendAdminNotification = async (feedback, userEmail) => {
//   const date = new Date().toLocaleDateString();
//   const html = renderTemplate(
//     path.join(__dirname, "../views/admin_feedback_notification.html"),
//     {
//       feedbackContent: feedback.content,
//       feedbackRating: feedback.rating,
//       userEmail: userEmail,
//       feedbackDate: date,
//     }
//   );
//   await sendEmail("mohid.anwar@gmail.com", "New Feedback Received", html);
// };

// // Send thank you email to the user
// const sendUserThankYou = async (userEmail, feedback) => {
//   const html = renderTemplate(
//     path.join(__dirname, "../views/user_feedback_thank_you.html"),
//     {
//       feedbackContent: feedback.content,
//       feedbackRating: feedback.rating,
//     }
//   );
//   await sendEmail(userEmail, "Thank You for Your Feedback", html);
// };
const transporter = require('../config/nodemailer_config')
const sendAdminNotification = async (feedback, userEmail) => {
  console.log("Works");
  const mailOptions = {
    
    from: 'ahmadraza77887087@gmail.com', // Replace with your email
    to: 'mohid.anwar@gmail.com', // Replace with admin's email
    subject: 'New Feedback Received',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Feedback Received</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>New Feedback Received</h1>
              <p><strong>Feedback Content:</strong> ${feedback.content}</p>
              <p><strong>Rating:</strong> ${feedback.rating}</p>
              <p><strong>Submitted by:</strong> ${userEmail}</p>
              <p><strong>Date:</strong> ${new Date(feedback.createdAt).toLocaleString()}</p>
          </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};


const sendUserThankYou = async (userEmail, feedback) => {
  const mailOptions = {
    from: 'ahmadraza77887087@gmail.com', // Replace with your email
    to: userEmail,
    subject: 'Thank You for Your Feedback!',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Your Feedback!</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Thank You for Your Feedback!</h1>
              <p>Thank you for your valuable feedback!</p>
              <p><strong>Feedback Content:</strong> ${feedback.content}</p>
              <p><strong>Rating:</strong> ${feedback.rating}</p>
          </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};



module.exports = {
  sendAdminNotification,
  sendUserThankYou,
};


