
interface ICreateCostCenter {
	name: string;
	monthlyLimit: number;
	startDate: Date;
}
class CreateCostCenter {
	constructor(
		private readonly costCenterRepository: any
	) { }
	async execute(costCenter: ICreateCostCenter) {
		await this.costCenterRepository.create(costCenter);
	}
}

export default CreateCostCenter;