# Inventory Management System

**Version:** v1.0.0 (Demo Release)  
**Status:** Demonstration Ready

A modern inventory management system designed for demonstration purposes, showcasing comprehensive development and QA capabilities. This system streamlines inventory control, enhances data reporting, and ensures secure user management while maintaining industry best practices in code quality, testing, and automation.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture & Modules](#architecture--modules)
  - [Stock Management API](#stock-management-api)
  - [Stock Dashboard UI](#stock-dashboard-ui)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Roadmap & Future Enhancements](#roadmap--future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

---

## Overview

The Inventory Management System is a comprehensive demonstration platform that showcases modern web development practices and QA automation. By integrating advanced security protocols, modern UI/UX, and dynamic data visualization, the platform demonstrates enterprise-level inventory management capabilities with comprehensive testing coverage and CI/CD automation.

This demo release (v1.0.0) emphasizes development and QA best practices including unit testing, integration testing, end-to-end testing, and automated deployment pipelines.

---

## Key Features

- **TypeScript Enhancements:** Resolved various TypeScript prop type errors, ensuring smooth Vercel deployments and robust code quality.
- **Enhanced Password Security:** Utilizes **Argon2id** as the primary password hashing algorithm with **bcrypt** as a fallback, meeting modern security standards.
- **Interactive Dashboard Visualization:** Incorporates **Chart.js** for dynamic doughnut and bar charts that provide insights into products, categories, and top-stock items.
- **Improved UI & UX:** Overhauled styling and responsiveness, introduced new UI components, and modularized the frontend code for enhanced maintainability.

---

## Architecture & Modules

GESTOCK IMS is divided into two primary modules that work in tandem to deliver a seamless inventory management experience.

### Stock Management API

**Purpose:**  
Provides a RESTful service to manage all aspects of inventory data including products, categories, and user authentication.

**Current Features:**
- **CRUD Operations:** Full support for creating, reading, updating, and deleting products and categories.
- **Secure Authentication:** User authentication is secured using Argon2id hashing, with bcrypt as a fallback option.
- **Role-Based Authorization:** Implements role-based access controls (e.g., admin-level privileges) to safeguard sensitive operations.

**Planned Enhancements:**
- **Third-Party Integrations:** Future plans include integration with external inventory systems.
- **Real-Time Notifications:** Implementation of real-time notifications for stock updates and other critical events.

---

### Stock Dashboard UI

**Purpose:**  
A modern, React + Vite-powered frontend that delivers data visualization tools and comprehensive inventory management capabilities.

**Current Features:**
- **Interactive Dashboard:** Features interactive Chart.js visualizations (doughnut & bar charts) to display inventory insights.
- **User Authentication:** Secure login and registration processes employing Argon2id (with bcrypt fallback).
- **Inventory Management:** Comprehensive CRUD functionality for managing products and categories.
- **Client Management:** Dedicated module for managing clients/customers with a sortable and user-friendly interface.
- **Responsive Design:** Built with modular, TypeScript-based components to ensure responsiveness across devices.

**Planned Enhancements:**
- **Advanced Charting & Filtering:** More sophisticated visualizations and filtering options for in-depth analytics.
- **Real-Time Data Updates:** Integration of websockets for live data updates.
- **Extended Reporting:** Enhanced reporting capabilities for sales analytics and performance metrics.

---

## Technology Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with Argon2id password hashing
- **Testing:** Jest with Supertest
- **Code Quality:** ESLint, Prettier

### Frontend
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router DOM
- **Charts:** Chart.js
- **Testing:** Vitest with React Testing Library
- **Linting:** ESLint with TypeScript support

### DevOps & QA
- **Version Control:** Git
- **CI/CD:** GitHub Actions
- **Code Coverage:** Integrated with reporting
- **Security:** Tr vulnerability scanning
- **Code Quality:** Automated linting and formatting
- **Git Hooks:** Husky with lint-staged

## Installation & Setup

### Prerequisites

- **Node.js:** Version 18.x or higher
- **MongoDB:** Local installation or MongoDB Atlas
- **Git:** For version control

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Install root dependencies (dev tools)
   cd ..
   npm install
   ```

3. **Set Up Environment Variables:**
   
   **Backend (.env):**
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/inventory-management-db
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your-super-secure-jwt-secret-key
   PORT=5000
   BCRYPT_SALT_ROUNDS=12
   NODE_ENV=development
   ```
   
   **Frontend (.env):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run the Development Server:**
   ```bash
   # Start backend (terminal 1)
   cd backend
   npm run dev
   
   # Start frontend (terminal 2)
   cd frontend
   npm run dev
   ```

   The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

### Frontend Tests
```bash
cd frontend
npm test                   # Run all tests
npm run test:ui            # Run tests with UI
npm run test:coverage      # Run tests with coverage report
```

### Code Quality
```bash
# Backend linting
cd backend
npm run lint               # Check code style
npm run lint:fix           # Fix auto-fixable issues

# Frontend linting
cd frontend
npm run lint               # Check code style
```

### Pre-commit Hooks
The project uses Husky and lint-staged to ensure code quality:
- Automatically runs ESLint and Prettier on staged files
- Prevents commits with failing tests
- Ensures consistent code formatting

## CI/CD Pipeline

### Automated Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Runs on push to `main` and `develop` branches
   - Executes backend and frontend test suites
   - Generates code coverage reports
   - Performs security vulnerability scanning
   - Builds both applications
   - Deploys to staging environment (for main branch)

2. **Code Quality** (`.github/workflows/quality.yml`)
   - Runs on pull requests
   - Performs comprehensive code quality checks
   - Checks for TODO comments and large files
   - Validates code formatting

### Coverage Reports
Coverage reports are automatically uploaded to Codecov for visualization and trend tracking.

## Project Structure

```
inventory-management-system/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic layer
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Custom middleware
│   │   ├── utils/              # Utility functions
│   │   └── server.js           # Application entry point
│   ├── __tests__/              # Test suites
│   ├── jest.config.json        # Jest configuration
│   └── package.json
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── contexts/           # React contexts
│   │   ├── api/                # API integration
│   │   ├── layout/             # Layout components
│   │   └── styles/             # CSS files
│   ├── __tests__/              # Test suites
│   ├── vitest.config.ts        # Vitest configuration
│   └── package.json
├── .github/workflows/          # CI/CD pipelines
├── docs/                       # Documentation
└── README.md
```

## Usage

After setting up the project, you can:

 - **Manage Inventory:** Use the Stock Management API endpoints to handle products and categories.

 - **Visualize Data:** Interact with the dashboard to view real-time inventory insights via charts.

 - **Secure Operations:** Register and log in securely to access administrative functionalities.

## Features

### Core Functionality
- ✅ User authentication and authorization
- ✅ Product management (CRUD operations)
- ✅ Category management
- ✅ Customer/client management
- ✅ Interactive dashboard with charts
- ✅ Responsive UI/UX design
- ✅ Real-time data validation

### Quality Assurance
- ✅ Comprehensive unit testing
- ✅ Integration testing
- ✅ End-to-end testing setup
- ✅ Code coverage reporting
- ✅ Automated CI/CD pipeline
- ✅ Security vulnerability scanning
- ✅ Code quality enforcement

### Development Features
- ✅ TypeScript support (frontend)
- ✅ ESLint and Prettier configuration
- ✅ Git hooks for code quality
- ✅ Hot module replacement
- ✅ Environment-based configuration
- ✅ Modular architecture

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Product Endpoints
- `GET /api/products` - List user products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Category Endpoints
- `GET /api/categories` - List user categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Customer Endpoints
- `GET /api/customers` - List customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get dashboard statistics

## Development Guidelines

### Code Style
- Follow ESLint configuration for consistent code style
- Use Prettier for automatic formatting
- Write meaningful commit messages
- Keep functions small and focused
- Use TypeScript for type safety (frontend)

### Testing Guidelines
- Write tests for all new features
- Maintain at least 80% code coverage
- Test both happy path and error cases
- Use descriptive test names
- Mock external dependencies

### Git Workflow
1. Create feature branch from `develop`
2. Make changes with meaningful commits
3. Ensure all tests pass
4. Create pull request to `develop`
5. Code review and merge
6. Deploy to staging from `develop`
7. Merge to `main` for production deployment

## Security Considerations

- JWT tokens for authentication
- Password hashing with Argon2id
- Input validation and sanitization
- CORS configuration
- Rate limiting implementation
- Environment variable security
- No sensitive data in client-side code

## Performance Optimizations

- Database indexing for queries
- Pagination for large datasets
- Lazy loading for components
- Image optimization
- Bundle size optimization
- Caching strategies

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure MongoDB is running
   - Check MONGO_URI in .env file
   - Verify network connectivity

2. **Authentication Problems**
   - Check JWT_SECRET is set
   - Verify token expiration
   - Clear browser localStorage

3. **Build Failures**
   - Run `npm install` to update dependencies
   - Check Node.js version (requires 18.x)
   - Clear node_modules and reinstall

4. **Test Failures**
   - Ensure test database is accessible
   - Check environment variables for testing
   - Run tests individually to isolate issues

## Contributing

This is a demonstration project showcasing modern development practices. Contributions are welcome and should follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Requirements for Contributions
- All tests must pass
- Code coverage must not decrease
- Follow existing code style
- Update documentation if needed
- Include tests for new features

## License

This project is licensed under the ISC License - see the package.json file for details.

## Acknowledgments

This demonstration project showcases:
- Modern web development practices
- Comprehensive testing strategies
- CI/CD automation
- Code quality enforcement
- Security best practices
- Performance optimization techniques

Built as a portfolio piece to demonstrate full-stack development and QA capabilities.
