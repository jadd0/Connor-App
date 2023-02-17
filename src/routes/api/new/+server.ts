import { job } from '../../stores/objects'
import { db } from '../../stores/objects';
import { get } from 'svelte/store';


const Job = get(job);
const DB = get(db);


export const GET: any = async ({ request }) => {
  console.log("hello")
  // const user = await DB.getValue({ table: 'Users', value: { username: 'jadd' } })
  // console.log(user)
  // await Job.activeJob({ user: user.uuid, jobID: '74446ea9-2d7e-4694-afca-b6abe1b20dd9', toBeCompletedDate: new Date()})
  // await Job.completeJob({ jobID: '74446ea9-2d7e-4694-afca-b6abe1b20dd9', user: user.uuid, amountPaid: 12 })
  // await Job.createReview({ user: user.uuid, reviewedUser: user.uuid, completedJobID: 'c1cf2b7f-66c7-47d4-8163-79d41d6056e5', review: 8, comment: 'pretty good!'})
	// return new Response('hello');
}