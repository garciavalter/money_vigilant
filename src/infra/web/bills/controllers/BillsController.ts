import BatchBillRegisterUseCase from '@application/bills/useCases/BatchBillRegisterUseCase';
import excelToJson from 'convert-excel-to-json';
import { container } from 'tsyringe';
import BillDTO from '@application/bills/useCases/Bill.dto';

interface excelDataDTO { [key: string]: string }

class BillsController {
	private batchBillRegisteruseCase: BatchBillRegisterUseCase = container.resolve(BatchBillRegisterUseCase);
	async registerBatch(bills: Buffer) {
		let formatBill: BillDTO[];
		try {
			formatBill = this.formatBill(bills);
		} catch (err) {
			return { sucess: [], error: [err] };
		}
		try {
			const result = await this.batchBillRegisteruseCase.execute(formatBill);
			return result;
		}
		catch (err) {
			return { sucess: [], error: [] };
		}

	}

	private formatBill(bills: Buffer): BillDTO[] {
		const data = excelToJson({
			source: bills,
		});
		let headers: excelDataDTO;
		const formattedBills: BillDTO[] = [];
		data.Planilha1.forEach((bill: excelDataDTO, index) => {
			if (index === 0) {
				Object.entries(bill).forEach(([key, value]) => {
					headers = { ...headers, [value]: key };
				});
				const requiredHeaders = ['name', 'amount', 'paymentDate', 'description', 'costCenter'];
				const missingHeaders = requiredHeaders.filter(header => !Object.keys(headers).includes(header));
				if (missingHeaders.length > 0) {
					throw new Error(`Missing headers: ${missingHeaders.join(', ')}`);
				}
				return;
			}

			const row = {
				name: bill[headers.name],
				amount: Number(bill[headers.amount]),
				paymentDate: new Date(bill[headers.paymentDate]),
				description: bill[headers.description],
				costCenter: bill[headers.costCenter]
			};
			formattedBills.push(row);

		});
		return formattedBills;
	}
}

export default BillsController;