import BillsRepositoryInterface from '@infra/repositories/sequelize/bills/BillsRepositoryInterface';
import { inject, injectable } from 'tsyringe';
import BillDTO from './Bill.dto';

@injectable()
class BatchBillRegisterUseCase {
	constructor(
		@inject('BillRepository')
		private billsRepository: BillsRepositoryInterface
	) { }
	async execute(input: BillDTO[]): Promise<any> {
		const output = await input.reduce(async (accP, bill) => {
			const acc = await accP;
			const centerCostId = await this.billsRepository.findCostCenterByName(bill.costCenter);
			if (!centerCostId) {

				acc.error.push({ ...bill, error: 'Cost Center not found' });
				return acc;
			}

			const created = await this.billsRepository.createBillIfNotExists(bill);
			if (!created) {
				acc.error.push({ ...bill, error: 'Bill already exists' });
				return acc;
			}
			acc.sucess.push(bill);
			return acc;
		}, Promise.resolve({ sucess: [], error: [] }));
		return output;
	}
}
export default BatchBillRegisterUseCase;