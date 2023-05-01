import { container } from 'tsyringe';
import BillsRepositoryInterface from '@infra/repositories/sequelize/bills/BillsRepositoryInterface';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';
container.registerSingleton<BillsRepositoryInterface>(
	'BillRepository',
	MemoryBillsRepository
);