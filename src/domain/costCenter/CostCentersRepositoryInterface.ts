interface CostCenterRepositoryInterface {
	createCostCenterIfNotExists(costCenter: string): Promise<boolean>;
}
export default CostCenterRepositoryInterface;