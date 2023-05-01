import { Router } from 'express';
import billsRouter from '../bills/routes';

const routes = Router();

routes.use('/bills', billsRouter);

export default routes;