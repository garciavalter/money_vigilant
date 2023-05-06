import {
	Model,
	Table,
	PrimaryKey,
	Column,
	HasMany,
	DataType,
} from 'sequelize-typescript';
import Bills from './Bills.model';
@Table({
	tableName: 'cost_centers',
	timestamps: true,
})
export default class CostCenters extends Model {
	@PrimaryKey
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
	})
	declare id: string;
	@Column({ allowNull: false })
	declare name: string;
	@Column({ allowNull: false })
	declare monthly_limit: number;
	@Column({ allowNull: false })
	declare startingDate: Date;
	@HasMany(() => Bills)
	declare bills: Bills[];
}