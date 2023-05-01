import BillDTO from '@application/bills/useCases/Bill.dto';
import BillsRepositoryInterface from './BillsRepositoryInterface';
import monthlyLimit from '@application/bills/useCases/MonthlyLimit.dto';

class MemoryBillsRepository implements BillsRepositoryInterface {
	constructor(
		private bills: BillDTO[] = [],
		private costCenters: any[] = [{
			id: '1',
			name: 'Cost Center 1'
		},
		{
			id: '2',
			name: 'Cost Center 2'
		},
		{
			id: '3',
			name: 'Cost Center 3'
		}],
		private monthlyLimit: monthlyLimit[] = []
	) { }
	getMonthlyLimit(costCenter: string): Promise<monthlyLimit> {
		const monthlyLimitFound = this.monthlyLimit
			.find(m => m.costCenter === costCenter);
		return Promise.resolve(monthlyLimitFound);
	}
	createmonthlyLimitIfNotExists(monthlyLimit: monthlyLimit): Promise<void> {
		const monthlyLimitFound = this.monthlyLimit
			.find(m => m.costCenter === monthlyLimit.costCenter);
		if (monthlyLimitFound) {
			return Promise.resolve();
		}
		this.monthlyLimit.push(monthlyLimit);
		return Promise.resolve();
	}

	getBillsSumByCostCenter(costCenter: string): Promise<number> {
		const bills = this.bills
			.filter(bill => bill.costCenter === costCenter);
		const billsSum = bills
			.reduce((acc, bill) => acc + bill.amount, 0);
		return Promise.resolve(billsSum);
	}
	getCostCenters(): Promise<string[]> {
		const costCenters = this.costCenters.map(costCenter => costCenter.name);
		return Promise.resolve(costCenters);
	}
	findCostCenterByName(costCenterName: string): Promise<string> {
		const costCenterFound = this.costCenters
			.find(costCenter => costCenter.name === costCenterName);
		return Promise.resolve(costCenterFound);

	}

	createBillIfNotExists(bill: any): Promise<any> {
		const billFound = this.bills
			.find(b => b.paymentDate === bill.paymentDate &&
				b.amount === bill.amount &&
				b.costCenter === bill.costCenter);
		if (billFound) {
			return Promise.resolve(false);
		}
		this.bills.push(bill);
		return Promise.resolve(true);
	}
	createCostCenterIfNotExists(costCenter: string): Promise<void> {
		const costCenterFound = this.costCenters
			.find(c => c.name === costCenter);
		if (costCenterFound) {
			return Promise.resolve();
		}
		this.costCenters.push({
			id: this.costCenters.length + 1,
			name: costCenter
		});
		return Promise.resolve();
	}


}

export default MemoryBillsRepository;