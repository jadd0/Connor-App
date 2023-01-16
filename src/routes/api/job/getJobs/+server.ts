import { error, redirect } from '@sveltejs/kit';
import { job, auth, db } from '../../../../stores';
import { get } from 'svelte/store';

const Job = get(job);
const Auth = get(auth);
const DB = get(db);

// jobID = Jobs.uuid
async function checkCorrectUser(jobID: string, userID: string) {
  const job = await DB.getValue({ table: 'ActiveJobs', value: { jobID } })
  
  if (!job) return false

  if (job.user != userID) return false
  
  return true
}

/** @type {import('./$types').Load} */
export const POST: any = async ({ request }) => {
	const cookie = Auth.Parse.parseCookie(request.headers.get('cookie'));
	if (cookie.key == undefined) {
		throw error(401, 'Not authorised');
	}

	const auth = await Auth.checkKey(cookie.key);
	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const { amount, type } = await request.json();
	if (amount == undefined || type == undefined) {
		throw error(406, 'Missing either job ID or amount paid');
	}

  if (auth.role != 'admin' || auth.role != 'writer') {
    throw error(401, 'Clients are not allowed to view different jobs');
  }

	const res = await DB.getValue;

	if (!res) {
		throw error(
			500,
			'Sorry, something has gone wrong on our end. If this continues to occur, please do not hesitate to email me at jaddalkwork@gmail.com'
		);
	}

	return new Response('Job created successfully.');
};
