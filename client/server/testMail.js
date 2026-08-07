import 'dotenv/config';
import nodemailer from 'nodemailer';

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.sendMail({
  from: process.env.SENDER_EMAIL,
  to: process.env.SENDER_EMAIL, // send to yourself for testing
  subject: 'Test Email',
  text: 'This is a test email from Node.js',
}, (err, info) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("SUCCESS:", info.response);
  }
});