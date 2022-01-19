import express from 'express';
import cors from 'cors';

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});