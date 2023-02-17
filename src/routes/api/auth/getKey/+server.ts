import { error, redirect } from '@sveltejs/kit';
import { auth } from '../../../stores/objects';
import { get } from 'svelte/store';

const Auth = get(auth);

/** @type {import('./$types').Load} */
export const GET: any = async ({ url }) => {
  const accessKey = url.searchParams.get('accessKey')
	// const uuid = url.searchParams.get('uuid')

	if (accessKey == undefined) {
		throw error(404, 'No access key or uuid provided. Please try again by providing both the access key and the uuid');
	}

	const auth = await Auth.checkAccessKey(accessKey);
	if (!auth) {
		throw error(401, 'Not authorised');
	}
	console.log(auth)
	// if (uuid != auth.uuid) {
	// 	throw error(401, 'Not authorised');
	// }

  const key = await Auth.changeKey(auth.uuid, Auth.Parse.generateToken())
	// console.log({key})
  if (!key) {
    throw error(500, 'Sorry, there has been an error on our side whilst trying to update your key. Please try again later. If this coninues to occur, please contact me at jaddalkwork@gmail.com.');
  }

	return new Response(JSON.stringify(key));
};
