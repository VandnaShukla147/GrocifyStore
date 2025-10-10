import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // your React dev URLs
  credentials: true
}));


app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(errorHandler);

export default app; 