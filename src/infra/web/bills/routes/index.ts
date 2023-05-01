import { Request, Response, Router } from 'express';
import BillsController from '../controllers/BillsController';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';

const billsRouter = Router();
const billsController = new BillsController();


billsRouter.post('/', (request: Request, response: Response) => {
	const form = new IncomingForm();
	console.log('form created');
	let file;
	form.parse(request, async (err, fields, files) => {
		console.log('parsing files');
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

export default billsRouter;