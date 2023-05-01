import { container } from 'tsyringe';
import GetBalanceUseCase from './GetBalanceUseCase';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';

let billsRepository: MemoryBillsRepository;

beforeAll(() => {
	jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
	container.reset();
	billsRepository = new MemoryBillsRepository();
	container.registerInstance('BillRepository', billsRepository);
});
describe('GetBalanceUseCase Unit Test', () => {
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
		const useCase = container.resolve(GetBalanceUseCase);
		const output = await useCase.execute();
		expect(output).toBe(undefined);
	});
});
