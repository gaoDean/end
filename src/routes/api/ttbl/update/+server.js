const res204 = new Response(null, {
	status: 204,
});

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const targetVersion = url.searchParams.get('target');

	const releases = await fetch(
		'https://api.github.com/repos/gaoDean/ttbl/releases',
	);
	if (!releases || !releases.ok) return res204;

	const release = (await releases.json()).find(
		(x) => x.tag_name === targetVersion,
	);
	if (!release) return res204;

	const assetsMacIntel = release.assets.find(
		(x) => x.name === 'ttbl-intel_tarball.tar.gz',
	);
	const assetsMacSilicon = release.assets.find(
		(x) => x.name === 'ttbl-m1_tarball.tar.gz',
	);

	if (!assetsMacIntel || !assetsMacSilicon) return res204;

	const ret = {
		version: targetVersion,
		notes: release.body,
		pub_date: release.published_at,
		platforms: {
			'darwin-x86_64': {
				signature: '',
				url: `https://github.com/gaoDean/ttbl/releases/download/${targetVersion}/ttbl-intel_tarball.tar.gz`,
			},
			'darwin-aarch64': {
				signature: '',
				url: `https://github.com/gaoDean/ttbl/releases/download/${targetVersion}/ttbl-m1_tarball.tar.gz`,
			},
		},
	};

	return new Response(JSON.stringify(ret), {
		status: 200,
	});
}
