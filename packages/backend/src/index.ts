import cors from 'cors';
import { errorHandler } from './middleware/error.middleware';
import express from 'express';
import healthRouter from './routes/health.route';
import oddsRouter from './routes/odds.route';
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/odds', oddsRouter);
app.use('/api/health', healthRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Millennium Falcon started at http://localhost:${port}`);
});
