import BillDTO from '@application/bills/useCases/Bill.dto';

interface BillsRepositoryInterface {
    createBillIfNotExists(bill: BillDTO): Promise<boolean>;
    findCostCenterByName(costCenter: string): Promise<string>;

}
export default BillsRepositoryInterface;