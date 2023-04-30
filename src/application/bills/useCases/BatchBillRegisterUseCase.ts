import BillsRepositoryInterface from '@infra/repositories/sequelize/bills/BillsRepositoryInterface';
import { inject, injectable } from 'tsyringe';

@injectable()
class BatchBillRegisterUseCase {
	constructor(
		@inject('BillRepository')
		private billsRepository: BillsRepositoryInterface
	) { }
	execute(input: any[]): void {
		input.forEach((bill) => {
			this.billsRepository.createBill(bill);
		});
	}
}
export default BatchBillRegisterUseCase;