import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Loads EMAIL_USER and EMAIL_PASS from .env

export const sendConfirmationEmail = async (to: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const confirmUrl = `http://localhost:3000/confirm?token=${token}`;

  const mailOptions = {
    from: `"Art by Natasha" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Confirm your email',
    html: `
      <h2>Welcome!</h2>
      <p>Please confirm your email by clicking the link below:</p>
      <a href="${confirmUrl}">Confirm Email</a>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('📬 Confirmation email sent to:', to);
};

