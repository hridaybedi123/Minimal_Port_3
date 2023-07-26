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
  service: "Gmail",
  auth: {
    user: "hridaybedi123@gmail.com",
    pass: "Wendigoboy!1",
  },
});

exports.sendContactEmail = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;


  // Email content
  const mailOptions = {
    from: email,
    to: "hridaybedi123@gmail.com", // Change this to your email address
    subject: "New Form Submission from your Website",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email.' };
  }
});
