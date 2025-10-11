import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

// ✅ Load allowed origins from environment variables
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL // e.g. https://grocify-store-navy.vercel.app
].filter(Boolean); // remove any undefined

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        console.log(`✅ CORS enabled for ${origin}`);
        callback(null, true);
      } else {
        console.log(`❌ CORS blocked for ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);
app.use(errorHandler);

export default app;
