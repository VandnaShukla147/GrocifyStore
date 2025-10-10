import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // your React dev URLs
  credentials: true
}));
console.log("✅ CORS allowed origin:", process.env.FRONTEND_URL);


app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(errorHandler);

export default app; 