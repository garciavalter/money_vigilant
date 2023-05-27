import BillsRepositoryInterface from '@domain/bills/repositories/BillsRepositoryInterface';
import { inject, injectable } from 'tsyringe';

@injectable()
class GetBalanceUseCase {
	constructor(
		@inject('BillRepository')
		private billRepository: BillsRepositoryInterface
	) { }
	async execute() {
		const costCenters = await this.billRepository.getCostCenters();
		const balance = await Promise.all(costCenters.map(async costCenter => {
			const bills = await this.billRepository.getBillsSumByCostCenter(costCenter);
			let currentBalance = 0;
			currentBalance = await this.getCurrentBalance(costCenter);
			const balance: { [key: string]: number } = {};
			balance[costCenter] = currentBalance - bills;
			return balance;
		}));
		return balance;
	}
	private async getCurrentBalance(costCenter: string) {
		const monthlyLimit = await this.billRepository.getMonthlyLimit(costCenter);
		const date1 = monthlyLimit.startingDate;
		const date2 = new Date();
		const diffMonths = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());
		return diffMonths * monthlyLimit.amount;
	}
}

export default GetBalanceUseCase;