import BillDTO from '@application/bills/useCases/Bill.dto';
import monthlyLimit from '@application/bills/useCases/MonthlyLimit.dto';


interface BillsRepositoryInterface {
    createBillIfNotExists(bill: BillDTO): Promise<boolean>;
    findCostCenterByName(costCenter: string): Promise<string>;
    getCostCenters(): Promise<string[]>;

    getBillsSumByCostCenter(costCenter: string): Promise<number>;

    getMonthlyLimit(costCenter: string): Promise<monthlyLimit>;

}
export default BillsRepositoryInterface;