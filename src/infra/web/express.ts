import express, { Request, Response } from 'express';
import routes from './routes';
const app = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => res.send('Hello World!'));
app.use(routes);
export default app;