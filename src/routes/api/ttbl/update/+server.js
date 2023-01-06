/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const targetVerson = url.searchParams.get('target');

	const releases = fetch("https://api.github.com/repos/gaoDean/ttbl/releases")

	const release = releases.find((x) => x.tag_name === targetVersion)

	if (!release) {
		return new Response(null, {
			status: 204,
		})
	}

	const assetsMacIntel = release.assets.find((x) => x.name === "ttbl-intel_tarball.tar.gz")
	const assetsMacSilicon = release.assets.find((x) => x.name === "ttbl-m1_tarball.tar.gz")

	if (!assetsMacIntel || !assetsMacSilicon) {
		return new Response(null, {
			status: 204,
		})
	}

	const ret = {
		version: targetVersion,
		notes: release.body,
		pub_date: release.published_at,
		platforms: {
			darwin-x86_64: {
				signature: "",
				url: assetsMacIntel.url
			},
			darwin-aarch64: {
				signature: "",
				url: assetsMacSilicon.url
			},
		}
	}

	return new Response(ret, {
		status: 200,
	});
}
