# Grocery Store Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the backend root with:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://shuklavandna56_db_user:123456VANDNA@grocifycluster.daqsxqa.mongodb.net/grocify?retryWrites=true&w=majority&appName=GrocifyCluster
JWT_SECRET=supersecretkey123
   FRONTEND_URL=https://grocify-store-navy.vercel.app
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