import BillDTO from '@application/bills/useCases/Bill.dto';
import BillsRepositoryInterface from './BillsRepositoryInterface';

class MemoryBillsRepository implements BillsRepositoryInterface {
	constructor(
		private bills: BillDTO[] = [],
		private costCenters: any[] = [{
			id: '1',
			name: 'Cost Center 1'
		}],
	) { }
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


}

export default MemoryBillsRepository;