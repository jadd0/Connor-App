import { error, redirect } from '@sveltejs/kit';
import { job, auth, db } from '../../stores/objects/objects';
import { get } from 'svelte/store';

const Job = get(job);
const Auth = get(auth);
const DB = get(db);

async function checkNotActive(jobID: string) {
  const job = await DB.getValue({ table: 'ActiveJobs', value: { jobID } })
  
  if (!job) return true

  return false
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

	const { jobID, toBeCompletedDate } = await request.json();
	if (jobID == undefined || toBeCompletedDate == undefined) {
		throw error(406, 'Missing either job ID or completion');
	}

  if (!await checkNotActive(jobID)) {
    throw error(401, 'You are unauthorised to mark this job as completed');
  }

	const res = await Job.activeJob({
		jobID,
		user: auth.uuid,
    toBeCompletedDate
	});

	if (!res) {
		throw error(
			500,
			'Sorry, something has gone wrong on our end. If this continues to occur, please do not hesitate to email me at jaddalkwork@gmail.com'
		);
	}

	return new Response('Job created successfully.');
};
