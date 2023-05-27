import CostCenterRepositoryInterface from '@domain/costCenter/CostCentersRepositoryInterface';

class MemoryCostCentersRepository implements CostCenterRepositoryInterface {
	async createCostCenterIfNotExists(costCenter: string): Promise<boolean> {
		return true;
	}

}