import 'reflect-metadata';
import path from 'path';
import BillsController from './BillsController';
import fs from 'fs';
import { container } from 'tsyringe';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';

let billsRepository: MemoryBillsRepository;
beforeAll(() => {
	jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
	container.reset();
	billsRepository = new MemoryBillsRepository();
	container.registerInstance('BillRepository', billsRepository);
});
let server;


beforeEach((done) => {
	server = app.listen(4000, (err) => {
		if (err) return done(err);

		agent = request.agent(server); // since the application is already listening, it should use the allocated port
		done();
	});
});

afterEach((done) => {
	return server && server.close(done);
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
		expect(output).toStrictEqual({ sucess: bills, error: [] });
	});
	it('Should get balance', async () => {
		const costCenters = ['Cost Center 1', 'Cost Center 2', 'Cost Center 3'];
		costCenters.forEach(async costCenter => await billsRepository.createCostCenterIfNotExists(costCenter));
		const monthlyLimits = [
			{
				costCenter: 'Cost Center 1',
				amount: 1000,
				startingDate: new Date('2022-01-01T00:00:00.000Z'),
			},
			{
				costCenter: 'Cost Center 2',
				amount: 2000,
				startingDate: new Date('2022-01-01T00:00:00.000Z'),
			},
			{
				costCenter: 'Cost Center 3',
				amount: 3000,
				startingDate: new Date('2022-01-01T00:00:00.000Z'),
			}
		];
		monthlyLimits.forEach(async monthlyLimit => await billsRepository.createmonthlyLimitIfNotExists(monthlyLimit));
		const bills = [
			{
				name: 'Bill 1',
				amount: 100,
				paymentDate: new Date(),
				description: 'Bill 1 description',
				costCenter: 'Cost Center 1'
			},
			{
				name: 'Bill 2',
				amount: 200,
				paymentDate: new Date(),
				description: 'Bill 2 description',
				costCenter: 'Cost Center 1'
			}
		];
		bills.forEach(async bill => await billsRepository.createBillIfNotExists(bill));
		const billsController = new BillsController();
		const output = await billsController.getBalance();
		expect(output).toStrictEqual([
			{ 'Cost Center 1': 11700 },
			{ 'Cost Center 2': 24000 },
			{ 'Cost Center 3': 36000 }
		]);
	});
});