
import { error, redirect } from "@sveltejs/kit";
import { db, auth } from '../stores/objects'
import { get } from 'svelte/store';

const DB = get(db)
const Auth = get(auth)

async function getKey(username: string): string {
	const req = await fetch(`/api/key?username=${username}`)
	return await req.json()
}

/** @type {import('./$types').Load} */
export const load: any = async ({ request }) => {
  const cookie = Auth.Parse.parseCookie(request.headers.get("cookie"));

	if (cookie.accessKey == undefined) {
		throw redirect(307, "/login");
	}
	
	const auth = await Auth.checkKey(cookie.accessKey)


	if (!auth) {
		throw redirect(307, "/login");
	}

	return {
		...auth
	}
}