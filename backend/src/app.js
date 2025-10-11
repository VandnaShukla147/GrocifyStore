import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

// ✅ Allow localhost and production
const allowedOrigins = [
  'http://localhost:3000',
  'https://grocify-store-navy.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://grocify-store-navy.vercel.app',
      ];
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


console.log('✅ CORS allowed origins:', allowedOrigins);

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);
app.use(errorHandler);

export default app;
