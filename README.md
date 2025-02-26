# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# **Refer & Earn Frontend**

This is the frontend application for the **Refer & Earn** platform built with React and Vite. The app provides an intuitive user interface for course referrals, featuring a landing page and interactive referral forms.

## **Tech Stack**

- **React**: UI library for building component-based interfaces
- **Vite**: Next-generation frontend tooling
- **Material-UI/Tailwind CSS**: Styling framework
- **Axios**: For API requests to the backend
- **React Hook Form**: Form handling and validation

## **Project Structure**

```
frontend/
│
├── public/                # Static files
│   └── ...
│
├── src/                   # Source files
│   ├── assets/            # Images, fonts, and other static assets
│   │
│   ├── Components/        # Reusable React components
│   │   ├── Header/        # Header navigation component
│   │   ├── Footer/        # Footer component
│   │   ├── ReferForm/     # Referral form components
│   │   ├── Modal/         # Popup modal component
│   │   └── ...
│   │
│   ├── App.jsx            # Main application component
│   ├── App.css            # Main application styles
│   ├── main.jsx           # Application entry point
│   ├── index.css          # Global styles
│   └── utils.jsx          # Utility functions
│
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependencies
├── README.md              # Project documentation
└── vite.config.js         # Vite configuration
```


## **Installation**

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run Dev**
   ```bash
   npm run dev
   ```



## **Development**

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   This will start the Vite development server, typically at `http://localhost:5173`

2. **Build for production:**
   ```bash
   npm run build
   ```


## **Component Details**

### Landing Page

The landing page features:
- Hero section with compelling copy about the referral program
- "Refer Now" button that triggers the referral modal
- Benefits section highlighting the advantages of referring friends

### Referral Modal

The modal contains a form with the following fields:

## **Integration with Backend**

The frontend communicates with the backend API for:




## **Deployment**

The frontend can be deployed using Vercel, Netlify, or any static site hosting:

1. **Vercel Deployment:**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify Deployment:**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

## **Best Practices**

- Use functional components with React hooks
- Implement proper error handling for API calls
- Maintain responsive design principles
- Keep components modular and reusable
- Use proper form validation
- Implement loading states for async operations

