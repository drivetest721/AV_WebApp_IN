# AccuVelocity Web App

A React web application that replicates the AccuVelocity login page design with modern UI/UX.

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Toggle Forms**: Switch between Sign Up and Login forms
- **Form Validation**: Client-side validation for all form fields
- **Modern UI**: Clean, professional design matching AccuVelocity branding
- **Interactive Elements**: Password visibility toggle, form validation feedback

## Project Structure

```
accuvelocity-web/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx
│   │   └── LoginPage.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Navigate to the project directory:
   ```bash
   cd accuvelocity-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality

## Design Features

### Sign Up Form
- Full name input
- Phone number with country code selector
- Work email validation
- Password with strength requirements
- Terms of service agreement
- reCAPTCHA verification

### Login Form
- Email/username input
- Password input with visibility toggle
- "Forgot Password" link
- reCAPTCHA verification

### Marketing Content
- Dynamic content based on form type
- Statistics showcase (80% Efficiency, 99% Accuracy, etc.)
- Social media links
- Professional imagery and branding

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern features
- **ESLint** - Code quality and consistency

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes.
