import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';

const allowedOrigins: string[] = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));
app.use(express.json());

app.get('/api/ping', (_req,res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});