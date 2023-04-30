import BillsRepositoryInterface from './BillsRepositoryInterface';

class MemoryBillsRepository implements BillsRepositoryInterface {
    createBill(bill: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

}

export default MemoryBillsRepository;