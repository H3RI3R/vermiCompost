# Exim Royals - Premium Indian Exports

A full-stack web application for an Indian agro-export business, built with Spring Boot (backend) and Next.js (frontend).

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.2
- **Database**: H2 (development)
- **Security**: Spring Security with JWT
- **Build Tool**: Maven

### Frontend
- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Language**: TypeScript

## Project Structure

```
antigravity/
├── backend/          # Spring Boot REST API
│   └── src/
│       └── main/
│           ├── java/com/dndglobal/
│           └── resources/
└── frontend/         # Next.js application
    └── src/
        ├── app/
        ├── components/
        └── lib/
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Features

- **Product Management**: CRUD operations for categories and products
- **Admin Authentication**: Secure JWT-based authentication
- **File Upload**: Image upload for products and categories
- **Enquiry System**: Contact form for international buyers
- **Static Pages**: Dynamic content management for About, Why Choose Us, etc.

## API Endpoints

### Public Endpoints
- `GET /api/categories` - List all categories
- `GET /api/products` - List all products
- `POST /api/enquiries` - Submit enquiry
- `GET /api/static-pages/{pageName}` - Get static page content

### Protected Endpoints (Admin)
- `POST /api/auth/signin` - Admin login
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category
- Similar endpoints for products

## Environment Variables

### Backend
Configure in `backend/src/main/resources/application.properties`

### Frontend
Create `.env.local` in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## License

MIT
