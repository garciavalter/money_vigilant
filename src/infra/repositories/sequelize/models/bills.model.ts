import {
	Model,
	Table,
	PrimaryKey,
	Column,
	BelongsTo,
	DataType,
} from 'sequelize-typescript';
import CostCenters from './CostCenters.models';
@Table({
	tableName: 'bills',
	timestamps: true,
})
export default class Bills extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare id: string;
	@Column({ allowNull: false })
	declare name: string;
	@Column({ allowNull: false })
	declare amount: number;
	@Column({ allowNull: false })
	declare payment_date: Date;
	@Column({ allowNull: false })
	declare description: string;
	@Column({
		allowNull: false,
		references: {
			model: 'cost_centers',
			key: 'id',
		},
		type: DataType.UUID,
	})
	declare id_cost_center: string;
	@BelongsTo(() => CostCenters)
	declare costCenter: CostCenters[];

}