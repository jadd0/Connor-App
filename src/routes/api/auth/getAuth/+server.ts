import { error, redirect } from '@sveltejs/kit';
import { auth } from '../../../stores/objects';
import { get } from 'svelte/store';

const Auth = get(auth);

/** @type {import('./$types').Load} */
export const POST: any = async ({ request }) => {
	const cookie = Auth.Parse.parseCookie(request.headers.get('cookie'));

	if (cookie.accessKey == undefined || cookie.key == undefined) {
		throw error(401, 'Not authorised');
	}

	const accessAuth = await Auth.checkAccessKey(cookie.accessKey);
	const keyAuth = await Auth.checkKey(cookie.key);

	if (!auth || !keyAuth) {
		throw error(401, 'Not authorised');
	}

	return new Response({...accessAuth});
};
