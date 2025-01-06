# Fintech Loan Management App

A comprehensive fintech application designed to streamline loan management, user accounts, and financial transactions. Built with React and Spring Boot, it provides a secure and efficient platform for managing loans, repayments, and user interactions.

## Project Overview

The Fintech Loan Management App is a full-stack solution that enables users to apply for loans, manage repayments, and track their financial transactions. The system features role-based access control, real-time transaction updates, and comprehensive loan management capabilities, making it suitable for both users and administrators.

## Features

### Loan Management
- Loan Application Processing
- Dynamic Interest Rate Calculation
- Repayment Scheduling
- Loan Status Tracking
- Document Management

### User Management
- User Registration and Authentication
- Role-Based Access Control
- Profile Management
- Secure Password Handling

### Transaction Management
- Payment Processing
- Transaction History
- Real-time Balance Updates
- Payment Schedule Tracking

### Dashboard & Analytics
- Loan Summary Statistics
- Payment Progress Tracking
- Transaction History
- Visual Progress Indicators

## Tech Stack

### Frontend:
- React (TypeScript)
- TailwindCSS for styling
- React Router for navigation
- React Toastify for notifications
- Axios for API calls
- Context API for state management

### Backend:
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL Database
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Java JDK 17
- PostgreSQL
- Maven

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fintech-loan-management-app.git
cd fintech-loan-management-app
```

2. Setup Backend
```bash
cd backend/fintech_loan_app
<<<<<<< HEAD
mvn clean install
=======
mvn install
>>>>>>> Add Docker Compose configuration and update README; modify .gitignore and header role handling
mvn spring-boot:run
```

3. Setup Frontend
```bash
cd client
npm install
npm start
```

### Environment Configuration

1. Backend Configuration (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/fintech_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

2. Frontend Configuration (.env)
```env
REACT_APP_API_URL=http://localhost:8080/api
```

## Running Tests

### Backend Tests
```bash
cd backend/fintech_loan_app
mvn test
```

### Frontend Tests
```bash
cd client
npm test
```

## Deployment

### Backend Deployment
1. Build the JAR file
```bash
<<<<<<< HEAD
mvn clean install
=======
mvn clean package
>>>>>>> Add Docker Compose configuration and update README; modify .gitignore and header role handling
```

2. Run the application
```bash
<<<<<<< HEAD
mvn spring-boot:run
=======
java -jar target/fintech_loan_app-0.0.1-SNAPSHOT.jar
>>>>>>> Add Docker Compose configuration and update README; modify .gitignore and header role handling
```

### Frontend Deployment
1. Create production build
```bash
npm run build
```
<<<<<<< HEAD
2. Run the application
```bash
npm run start
```
=======

2. Deploy the contents of the `build` folder to your web server
>>>>>>> Add Docker Compose configuration and update README; modify .gitignore and header role handling

## API Documentation

The API documentation is available at `/swagger-ui.html` when running the backend server.

Key endpoints:
- `/api/auth/*` - Authentication endpoints
- `/api/loans/*` - Loan management endpoints
- `/api/users/*` - User management endpoints
- `/api/transactions/*` - Transaction management endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<<<<<<< HEAD
=======
## Acknowledgments

- Spring Boot team for the excellent framework
- React team for the frontend framework
- All contributors who participate in this project
>>>>>>> Add Docker Compose configuration and update README; modify .gitignore and header role handling
