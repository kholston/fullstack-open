import express ,{Request}from 'express';
import { calculator, Operation } from './calculator';
const app = express();

 interface CalculatorBody {
  'value1' : number,
  'value2' : number,
  'op': string
}

app.use(express.json());

app.get('/ping', (_req,res) => {
  res.send('pong');
});

app.post('/calculate', (req: Request, res) => {
  
  const body: CalculatorBody = req.body as CalculatorBody;

  const result = calculator(body.value1, body.value2, body.op as Operation);
 
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});