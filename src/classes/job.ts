import { DB } from './db';

export class Job extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async checkNotThere(table: string, value: any) {
		const res = await this.getValue({ table, value });

		if (res) return false;
		return true;
	}

	async checkUser(user: string, completedUser: string, jobID: string) {
		const completedJob = await this.getValue({ table: 'CompletedJobs', value: { uuid: jobID } });
		if (!completedJob) return false;

		const job = await this.getValue({ table: 'Jobs', value: { uuid: completedJob.jobID } });
		if (!job) return false;

		if (job.user != user || completedJob.user != completedUser) return false;

		return true;
	}

	async createJob(config: { title: string; description: string; user: string; type: string; price: number }) {
		const { title, description, user, type, price } = config;

		const uuid: string = this.generateUUID();
		(uuid);
		const createRes = await this.newValue({
			table: 'Jobs',
			values: { title, description, user, uuid, price, type }
		});
		(createRes);

		if (!createRes) return false;

		return true;
	}

	async completeJob(config: { jobID: string; user: string; amountPaid: number }) {
		const { jobID, user, amountPaid } = config;

		const uuid: string = this.generateUUID();

		const createRes = await this.newValue({
			table: 'CompletedJobs',
			values: { jobID, user, uuid, amountPaid }
		});
		if (!createRes) return false;

		const deleteRes = await this.deleteValue({ table: 'ActiveJobs', values: { jobID } });
		if (!deleteRes) return false;

		return true;
	}

	async activeJob(config: { jobID: string; user: string; toBeCompletedDate: Date }) {
		const { jobID, user, toBeCompletedDate } = config;

		if (!(await this.checkNotThere('ActiveJobs', { jobID, user }))) return false;

		const uuid = this.generateUUID();

		const createRes = await this.newValue({
			table: 'ActiveJobs',
			values: { jobID, user, uuid, toBeCompletedDate }
		});

		if (!createRes) return false;

		return true;
	}

	async createReview(config: {
		user: string;
		reviewedUser: string;
		completedJobID: string;
		review: number;
		comment: string;
	}) {
		const { user, reviewedUser, completedJobID, review, comment } = config;

		const check = await this.checkUser(user, reviewedUser, completedJobID);
	
		if (!check) return false;

		const res = await this.newValue({
			table: 'Reviews',
			values: { uuid: this.generateUUID(), user, reviewedUser, jobID: completedJobID, review, comment }
		});

		(res)

		if (!res) return false;
		return true;
	}
}