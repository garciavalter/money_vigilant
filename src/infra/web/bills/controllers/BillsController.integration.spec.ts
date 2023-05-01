import 'reflect-metadata';
import path from 'path';
import BillsController from './BillsController';
import fs from 'fs';
import { container } from 'tsyringe';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';

let billsRepository: MemoryBillsRepository;
beforeAll(() => {
	container.reset();
	billsRepository = new MemoryBillsRepository();
	container.registerInstance('BillRepository', billsRepository);
});

describe('BillsController Integration Test', () => {
	it('should be able to register a batch of bills', async () => {
		const bills = [
			{
				name: 'Bill 1 Description',
				amount: 100,
				paymentDate: new Date('2023-04-30T03:00:28.000Z'),
				description: 'Bill 1 Description',
				costCenter: 'Cost Center 1'
			}
		];
		const rootFolder = path.join(__dirname, '..', '..', '..', '..', '..');
		const file = fs.readFileSync(path.join(rootFolder, 'test', 'validTest.xlsx'));
		const billsController = new BillsController();
		const output = await billsController.registerBatch(file);
		console.log(output);
		expect(output).toStrictEqual({ sucess: bills, error: [] });
	});
});