# Smart Sales Dashboard - Backend API

This is the backend API server for the Smart Sales Dashboard application.

## Features

- **RESTful API**: Complete CRUD operations for customers, sales, and products
- **Authentication**: JWT-based authentication with role-based access
- **Database**: SQLite database for easy setup and development
- **File Upload**: CSV import functionality for bulk data operations
- **Analytics**: Pre-built analytics endpoints for dashboard data

## Quick Start

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **For development with auto-restart**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale
- `PUT /api/sales/:id` - Update sale
- `DELETE /api/sales/:id` - Delete sale

### Products
- `GET /api/products` - Get all products

### Analytics
- `GET /api/analytics` - Get analytics data

### File Upload
- `POST /api/upload/customers` - Upload CSV file for customers

### Health Check
- `GET /api/health` - Server health status

## Database Schema

The server automatically creates the following tables:

### Users
- id, email, password, name, role, created_at

### Customers
- id, name, email, phone, company, city, total_spent, total_orders, status, created_at

### Sales
- id, customer_id, customer_name, product, quantity, unit_price, amount, status, created_at

### Products
- id, name, price, category, created_at

## Default Data

The server includes:
- Default admin user: `admin@company.com` / `admin123`
- 10 sample products
- Automatic database initialization

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS enabled for frontend integration
- Input validation and sanitization
- SQL injection protection with parameterized queries

