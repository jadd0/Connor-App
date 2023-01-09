import { job } from '../../../stores'
import { db } from '../../../stores';
import { get } from 'svelte/store';


const Job = get(job);
const DB = get(db);


export const GET: any = async ({ request }) => {
	
  const user = await DB.getValue({ table: 'Users', value: { username: 'jadd' } })
  const job = await DB.getValue({ table: 'Jobs', value: { uuid: '553b9ef4-809e-4c04-85a7-b03e63ebf435' }})
  console.log({job})
  await Job.completeJob({ jobID: job.uuid, user: user.uuid, amountPaid: 12 })
	return new Response('hello');
}