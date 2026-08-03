import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { createServer } from 'vite';

dotenv.config();

const port = Number(process.env.PORT || 4173);
const app = express();
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, location, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in your name, email, and message.' });
    }

    const toEmail = process.env.TO_EMAIL || process.env.FROM_EMAIL || 'your_email@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || 'your_email@gmail.com';

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Location:</strong> ${location || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nLocation: ${location || 'N/A'}\nMessage: ${message}`;

    let sent = false;

    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'your_sendgrid_api_key_here') {
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({
          to: toEmail,
          from: fromEmail,
          subject: `Portfolio Contact: ${name}`,
          text,
          html,
        });
        sent = true;
      } catch (error) {
        console.error('SendGrid send error:', error);
        throw new Error('SendGrid authentication failed. Please use a valid API key.');
      }
    }

    if (!sent && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: `Portfolio Contact: ${name}`,
        text,
        html,
      });
      sent = true;
    }

    if (!sent) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Set a valid SENDGRID_API_KEY or SMTP credentials.',
      });
    }

    return res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email.',
    });
  }
});

const vite = await createServer({
  root: process.cwd(),
  server: { middlewareMode: true },
});

app.use(vite.middlewares);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
