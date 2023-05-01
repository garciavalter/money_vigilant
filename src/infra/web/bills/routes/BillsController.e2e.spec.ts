


import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import { container } from 'tsyringe';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';

let billsRepository: MemoryBillsRepository;
describe('File upload endpoint', () => {

	beforeAll(async () => {
		container.reset();
		billsRepository = new MemoryBillsRepository();
		container.registerInstance('BillRepository', billsRepository);
		return Promise.resolve();
	});

	it('should upload a file successfully', async () => {
		const app = require('../../express').default;
		const rootFolder = path.join(__dirname, '..', '..', '..', '..', '..');
		const file = fs.createReadStream((path.join(rootFolder, 'test', 'validTest.xlsx')));
		const response = await supertest(app)
			.post('/bills')
			.attach('file', file, 'validTest.xlsx');
		expect(response.status).toBe(200);
		expect(response.text).toBe('File uploaded successfully');
	});
});
