# Portfolio Three.js

A modern portfolio website built with React, TypeScript, Vite, and Three.js. It showcases projects, experience, skills, and contact information with immersive 3D visuals and a polished dark UI.

## Features

- Responsive portfolio layout
- Animated 3D hero background and skill visualizations
- Project showcase and experience timeline
- Contact form with email integration
- Fast-loading and optimized performance

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Three.js
- React Three Fiber
- Motion
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your email settings if you want the contact form to send messages.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build the project for production
- `npm run preview` — preview the production build

## Contact Form Configuration

To enable email sending from the contact form, add the following environment variables to your `.env` file:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_gmail_app_password_here
FROM_EMAIL=your_email@gmail.com
TO_EMAIL=your_email@gmail.com
```

You can also use SendGrid instead of SMTP:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your_email@gmail.com
TO_EMAIL=your_email@gmail.com
```

## License

This project is licensed under the MIT License.
