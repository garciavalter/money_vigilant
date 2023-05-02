import { Request, Response, Router } from 'express';
import BillsController from '../controllers/BillsController';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';

const billsRouter = Router();
const billsController = new BillsController();


billsRouter.post('/', (request: Request, response: Response) => {
	const form = new IncomingForm();
	form.parse(request, async (err, fields, files) => {
		if (err) {
			console.error(err);
			response.status(500).send('Internal server error');
			return;
		}
		const tempFilePath = files.file as any;
		const readableStream = fs.readFileSync(tempFilePath.filepath);
		const res = await billsController.registerBatch(readableStream);
		return response.status(200).json(res);
	});
});
billsRouter.get('/get-balance', async (request: Request, response: Response) => {

	try {
		const res = await billsController.getBalance();
		return response.status(200).json(res);
	} catch (err) {
		console.error(err);
		return response.status(500).send('Internal server error');
	}
});
export default billsRouter;