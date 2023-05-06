'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('bills', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			amount: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			payment_date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			description: {
				allowNull: true,
				type: Sequelize.STRING
			},
			cost_center: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'cost_centers',
				}
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		return await queryInterface.dropTable('bills');
	}
};
