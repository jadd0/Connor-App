import { error, redirect } from '@sveltejs/kit';
import { job, auth } from '../../../../stores';
import { get } from 'svelte/store';

const Job = get(job);
const Auth = get(auth);

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

	const { title, description, price } = await request.json();
	if (title == undefined || description == undefined || price == undefined) {
		throw error(406, 'Missing either title, description or price');
	}

	const res = await Job.createJob({
		title,
		description,
		price,
		user: auth.uuid
	});

	if (!res) {
		throw error(
			500,
			'Sorry, something has gone wrong on our end. If this continues to occur, please do not hesitate to email me at jaddalkwork@gmail.com'
		);
	}

	return new Response(200, 'Job created successfully.');
};