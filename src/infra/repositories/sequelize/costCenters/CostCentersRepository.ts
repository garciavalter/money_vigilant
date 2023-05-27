import CostCenterRepositoryInterface from '@domain/costCenter/CostCentersRepositoryInterface';
import CostCenters from '../models/CostCenters.model';

class SequelizeCostsCenterRepository implements CostCenterRepositoryInterface {
	async createCostCenterIfNotExists(costCenter: any): Promise<boolean> {
		const [_, created] = await CostCenters.findOrCreate({
			where: { name: costCenter.name },
			defaults: costCenter,
		});
		return created;
	}
}
export default SequelizeCostsCenterRepository;