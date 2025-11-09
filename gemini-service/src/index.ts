import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import geminiRoutes from './routes';

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ALLOW_ORIGINS ? process.env.CORS_ALLOW_ORIGINS.split(',') : '*',
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', geminiRoutes);

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

