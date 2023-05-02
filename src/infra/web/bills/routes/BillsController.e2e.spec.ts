import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import { container } from 'tsyringe';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';

let billsRepository: MemoryBillsRepository;
let app: any;
describe('File upload endpoint', () => {

	beforeAll(async () => {
		container.reset();
		billsRepository = new MemoryBillsRepository();
		container.registerInstance('BillRepository', billsRepository);
		app = require('../../express').default;
	});

	it('should upload a file successfully', async () => {
		const rootFolder = path.join(__dirname, '..', '..', '..', '..', '..');
		const file = fs.createReadStream((path.join(rootFolder, 'test', 'validTest.xlsx')));
		const response = await supertest(app)
			.post('/bills')
			.attach('file', file, 'validTest.xlsx');
		expect(response.status).toBe(200);
		expect(response.text).toStrictEqual('{"sucess":[{"name":"Bill 1 Description","amount":100,"paymentDate":"2023-04-30T03:00:28.000Z","description":"Bill 1 Description","costCenter":"Cost Center 1"}],"error":[]}');
	});
	it('Should get balance', async () => {
		jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
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
		const response = await supertest(app)
			.get('/bills/get-balance');
		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual([
			{ 'Cost Center 1': 11600 },
			{ 'Cost Center 2': 24000 },
			{ 'Cost Center 3': 36000 }
		]);
	});
});