import { error, redirect } from '@sveltejs/kit';
import { job, auth, db } from '../../stores/objects/objects';
import { get } from 'svelte/store';

const Job = get(job);
const Auth = get(auth);
const DB = get(db);

// jobID = Jobs.uuid
async function checkCorrectUser(jobID: string, userID: string) {
  
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

	const { amount, type, range } = await request.json();
	if (amount == undefined || type == undefined || range == undefined) {
		throw error(406, 'Missing either job ID or amount paid');
	}

  if (auth.role != 'admin' || auth.role != 'writer') {
    throw error(401, 'Clients are not allowed to view different jobs');
  }

	const res = await DB.getRangeValues({ table: 'Jobs', value: { type }, range: [range[0], range[1]] });

  // get values which are in jobs but not in active jobs





	if (!res) {
		throw error(
			500,
			'Sorry, something has gone wrong on our end. If this continues to occur, please do not hesitate to email me at jaddalkwork@gmail.com'
		);
	}

	return new Response(res);
};
