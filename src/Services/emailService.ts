import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: `"Art by Natasha" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📬 Email sent to ${to}: ${subject}`);
};

export const sendConfirmationEmail = async (to: string, token: string) => {
  const confirmUrl = `http://localhost:3000/confirm?token=${token}`;
  const html = `
    <h2>Welcome!</h2>
    <p>Please confirm your email by clicking the link below:</p>
    <a href="${confirmUrl}">Confirm Email</a>
  `;
  await sendEmail(to, 'Confirm your email', html);
};

export const sendPasswordResetEmail = async (to: string, resetUrl: string) => {
  const html = `
    <p>You requested a password reset.</p>
    <p>Click the link below to set a new password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you didn’t request this, you can safely ignore this email.</p>
  `;
  await sendEmail(to, 'Reset Your Password', html);
};



