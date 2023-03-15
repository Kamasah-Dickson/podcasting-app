/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"is4-ssl.mzstatic.com",
			"is2-ssl.mzstatic.com",
			"ssl-static.libsyn.com",
			"is3-ssl.mzstatic.com",
			"is5-ssl.mzstatic.com",
			"is1-ssl.mzstatic.com",
			"images.transistor.fm",
			"assets.pippa.io",
			"megaphone.imgix.net",
		],
	},
};

module.exports = nextConfig;
