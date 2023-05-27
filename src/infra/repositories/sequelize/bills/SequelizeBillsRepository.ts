import BillDTO from '@application/bills/useCases/Bill.dto';
import monthlyLimit from '@application/bills/useCases/MonthlyLimit.dto';
import BillsRepositoryInterface from '../../../../domain/bills/repositories/BillsRepositoryInterface';
import Bills from '../models/Bills.model';
import { Op, Sequelize } from 'sequelize';
import CostCenters from '../models/CostCenters.model';
import { sequelize } from '..';

class SequelizeBillsRepository implements BillsRepositoryInterface {
	async createBillIfNotExists(entity: BillDTO): Promise<boolean> {
		const [bill, created] = await Bills.findOrCreate({
			raw: true,
			where: {
			}, defaults: {
				name: entity.name,
				amount: entity.amount,
				paymentDate: entity.paymentDate,
				description: entity.description,
				costCenter: entity.costCenter
			}
		});
		return created;
	}
	async findCostCenterByName(costCenterName: string): Promise<string> {
		const [costCenter, created] = await CostCenters.findOrCreate({
			raw: true,
			where: {
				name: {
					[Op.iLike]: costCenterName
				}
			}
		});
		return costCenter.id;
	}
	async getCostCenters(): Promise<string[]> {
		const costCenters = await CostCenters.findAll({
			raw: true,
			attributes: ['name']
		});
		return costCenters.map(costCenter => costCenter.name);
	}
	async getBillsSumByCostCenter(costCenter: string): Promise<any> {
		const allBills = await Bills.findAll({
			raw: true,
			//@ts-ignore
			attributes: [sequelize.fn(
				'sum', sequelize.col('amount')
			), 'total'],
			include: [{
				model: CostCenters,
				where: {
					name: costCenter
				}
			}]
		});
		return allBills;
	}
	async getMonthlyLimit(costCenter: string): Promise<monthlyLimit> {
		const costCenterFound = await CostCenters.findOne({
			raw: true,
			where: {
				name:
					{ [Op.iLike]: costCenter }
			}
		});
		return {
			costCenter: costCenterFound.name,
			amount: costCenterFound.monthly_limit,
			startingDate: costCenterFound.starting_date,
		};
	}

}

export default SequelizeBillsRepository;