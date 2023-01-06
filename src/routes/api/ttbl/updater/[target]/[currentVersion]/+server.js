/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const target = url.searchParams.get('target');
	const currentVersion = url.searchParams.get('currentVersion');



	return new Response(`${target}/${currentVersion}`);
}
