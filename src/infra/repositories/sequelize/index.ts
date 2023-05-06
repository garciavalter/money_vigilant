import { Sequelize } from 'sequelize-typescript';
import { readdirSync } from 'fs';
import { join } from 'path';
export let sequelize: Sequelize;
const env = process.env.NODE_ENV || 'development';
const config = require('@config/database/config.json')[env];
function setupSequelize() {
	try {
		sequelize = new Sequelize(config);
		const modelsDir = join(__dirname, 'models');
		readdirSync(modelsDir).forEach((file) => {
			if (file.endsWith('.model.ts')) {
				const model = require(join(modelsDir, file)).default;
				sequelize.addModels([model]);

			}
		});
		Object.values(sequelize.models).forEach((model) => {
			//@ts-ignore
			if (typeof model.associate === 'function') {

				//@ts-ignore
				model.associate(sequelize.models);
			}
		});

		console.log('Sequelize setup complete');
	} catch (err) {
		console.error('Sequelize setup failed:', err.message);
	}
}

setupSequelize();