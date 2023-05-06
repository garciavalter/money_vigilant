'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('cost_centers', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			monthly_limit: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			startingDate: {
				allowNull: false,
				type: Sequelize.DATE
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
		return await queryInterface.dropTable('cost_centers');
	}
};
