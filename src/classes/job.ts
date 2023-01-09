import { DB } from './db';

export class Job extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async checkNotThere(table: string, value: any) {
    const res = await this.getValue({ table, value })
    
    if (res) return false
    return true
  }

	async createJob(config: { title: string; description: string; user: string; price: number }) {
		const { title, description, user, price } = config;

		const uuid: string = this.generateUUID();
    console.log(uuid)
		const createRes = await this.newValue({
			table: 'Jobs',
			values: { title, description, user, uuid: uuid, price }
		});
   
		if (!createRes) return false;

		return true;
	}

	async completeJob(config: { jobID: string; user: string; amountPaid: number, review: number }) {
		const { jobID, user, amountPaid, review } = config;

		const uuid: string = this.generateUUID();

		const createRes = await this.newValue({
			table: 'CompletedJobs',
			values: { jobID, user, uuid, amountPaid, review }
		});
		if (!createRes) return false;

		const deleteRes = await this.deleteValue({ table: 'ActiveJobs', values: { jobID } });
		if (!deleteRes) return false;

		return true;
	}

	async activeJob(config: { jobID: string; user: string; toBeCompletedDate: Date }) {
		const { jobID, user, toBeCompletedDate } = config;

    if (!await this.checkNotThere('ActiveJobs', { jobID, user })) return false

		const uuid = this.generateUUID();

		const createRes = await this.newValue({
			table: 'ActiveJobs',
			values: { jobID, user, uuid, toBeCompletedDate }
		});

		if (!createRes) return false;

		return true;
	}
}
