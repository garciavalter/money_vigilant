
import { container } from 'tsyringe';
import BatchBillRegisterUseCase from './BatchBillRegisterUseCase';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';



let billsRepository: MemoryBillsRepository;
beforeEach(() => {
	container.reset();
	billsRepository = new MemoryBillsRepository();
	container.registerInstance('BillRepository', billsRepository);
});


describe('BatchBillRegisterUseCase Unity Test', () => {
	it('should be able to register a batch of bills', async () => {
		const bills = [
			{
				name: 'Bill 1',
				amount: 100,
				paymentDate: new Date(),
				description: 'Bill 1 description',
				costCenter: 'Cost Center 1'
			}
		];
		const batchBillRegisterUseCase = container.resolve(BatchBillRegisterUseCase);
		const output = await batchBillRegisterUseCase.execute(bills);
		expect(output).toStrictEqual({ sucess: bills, error: [] });
	});
	it('should return bills with no center of costs founded', async () => {
		const bills = [
			{
				name: 'Bill 1',
				amount: 100,
				paymentDate: new Date(),
				description: 'Bill 1 description',
				costCenter: 'Unavailable Cost Center'
			}
		];
		const batchBillRegisterUseCase = container.resolve(BatchBillRegisterUseCase);
		const output = await batchBillRegisterUseCase.execute(bills);

		expect(output).toStrictEqual({ sucess: [], error: [{ ...bills[0], error: 'Cost Center not found' }] });
	});
	it('should return if a bill already exists', async () => {
		const bills = [
			{
				name: 'Bill 1',
				amount: 100,
				paymentDate: new Date(),
				description: 'Bill 1 description',
				costCenter: 'Cost Center 1'
			}
		];
		await billsRepository.createBillIfNotExists(bills[0]);
		const batchBillRegisterUseCase = container.resolve(BatchBillRegisterUseCase);
		await batchBillRegisterUseCase.execute(bills);
		const output = await batchBillRegisterUseCase.execute(bills);

		expect(output).toStrictEqual({
			sucess: [], error: [{
				...bills[0], error: 'Bill already exists'
			}]
		});
	});
});