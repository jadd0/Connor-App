
import { error, redirect } from "@sveltejs/kit";
// import { db, auth } from '../stores/objects'
import { get } from 'svelte/store';


async function getAuth(cookies: any): any {
	const res = await fetch("/api/auth", {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			cookies
		}),
	});
	return await res.json()
}

/** @type {import('./$types').Load} */
export const load: any = async ({ request }) => {
  const res = await getAuth(request.headers.get("cookie"))

	if (!res) {
		throw redirect(307, "/login");
	}

	
	return {
		...auth
	}
}