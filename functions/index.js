/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hridaybedi123@example.com",
    pass: "Wendigoboy!1",
  },
});

exports.sendEmailOnFormSubmission = functions.https.onRequest((req, res) => {
  // Get form data from the request
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Email content
  const mailOptions = {
    from: "hridaybedi123@example.com",
    to: "hridaybedi123@example.com", // Change this to your email address
    subject: "New Form Submission from your Website",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email.");
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully!");
    }
  });
});
