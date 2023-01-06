/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const targetVerson = url.searchParams.get('target');
	const currentVersion = url.searchParams.get('current');

	const ret = {
		targetVersion,
		currentVersion,
	}

	return new Response(ret);
}
