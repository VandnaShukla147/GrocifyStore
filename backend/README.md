# Grocery Store Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend root with:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/grocery
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:3000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Features
- User authentication (JWT)
- Product, cart, and order management
- Input validation (Joi)
- Centralized error handling
- CORS and logging

## API Endpoints
- `/api/auth/signup` - User registration
- `/api/auth/login` - User login
- `/api/products` - Product CRUD
- `/api/cart` - Cart management
- `/api/orders` - Order management 