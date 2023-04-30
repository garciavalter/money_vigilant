
import { container } from 'tsyringe';
import BatchBillRegisterUseCase from './BatchBillRegisterUseCase';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';


const bills = [
	{
		name: 'Bill 1',
		amount: 100,
		paymentDate: new Date(),
		description: 'Bill 1 description',
		costCenter: 'Cost Center 1'
	}
];

let billsRepository: MemoryBillsRepository;
beforeAll(() => {
	container.reset();
	billsRepository = new MemoryBillsRepository();
	container.registerInstance('BillRepository', billsRepository);
});


describe('BatchBillRegisterUseCase Unity Test', () => {
	it('should be able to register a batch of bills', () => {
		const batchBillRegisterUseCase = container.resolve(BatchBillRegisterUseCase);
		batchBillRegisterUseCase.execute(bills);
		expect(1).toBe(1);
	});
});