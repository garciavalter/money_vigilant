import { container } from 'tsyringe';
import BillsRepositoryInterface from '@domain/bills/repositories/BillsRepositoryInterface';
import MemoryBillsRepository from '@infra/repositories/sequelize/bills/MemoryBillsRepository';
container.registerSingleton<BillsRepositoryInterface>(
	'BillRepository',
	MemoryBillsRepository
);