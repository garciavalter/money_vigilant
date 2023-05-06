import { Sequelize } from 'sequelize-typescript';
import { readdir, readdirSync } from 'fs';
import { join } from 'path';
export let sequelize: Sequelize;
const env = process.env.NODE_ENV || 'development';
const config = require('@config/database/config.json')[env];
function setupSequelize() {
	const pendingModels = [];
	function addModel(model: any) {
		try {
			sequelize.addModels([model]);
		} catch (err) {
			pendingModels.push(model);
		}
	}
	try {
		sequelize = new Sequelize(config);
		const modelsDir = join(__dirname, 'models');

		readdirSync(modelsDir).forEach((file) => {
			if (file.endsWith('.model.ts')) {
				const model = require(join(modelsDir, file)).default;
				pendingModels;
			}
		});
		while (pendingModels.length > 0) {
			const model = pendingModels.shift();
			addModel(model);
		}
		console.log('Sequelize setup complete');
	} catch (err) {
		console.error('Sequelize setup failed:', err.message);
	}
}

setupSequelize();