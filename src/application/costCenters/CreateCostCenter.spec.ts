import CreateCostCenter from './CreateCostCenter';
const costCenterRepository = {
	create: jest.fn()
};
describe('CreateCostCenter unit tests', () => {
	it('should create a cost center', () => {
		const createCostCenter = new CreateCostCenter(costCenterRepository);
		createCostCenter.execute({
			name: 'Cost Center 1',
			monthlyLimit: 1000,
			startDate: new Date()
		});
	});
});
