import axios from "axios";

export const getStaticPaths = async () => {
	const response1 = await fetch("https://ipapi.co/json/");
	const { country_code } = await response1.json();
	const response2 = await axios.get(
		`https://listen-api.listennotes.com/api/v2/top_podcasts?country=${country_code}`,
		{
			headers: {
				"X-ListenAPI-Key": process.env.API_KEY,
			},
		}
	);

	const data = response2.data.podcasts;

	interface data {
		id: string;
		title: string;
		audio: string;
	}
	const paths = data.map((data: data) => {
		return {
			params: { id: data.id.toString() },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context: any) => {
	const id = context.params.id;

	const response1 = await fetch("https://ipapi.co/json/");
	const { country_code } = await response1.json();
	const response2 = await axios.get(
		`https://listen-api.listennotes.com/api/v2/podcasts/${id}?country=${country_code}`,
		{
			headers: {
				"X-ListenAPI-Key": process.env.API_KEY,
			},
		}
	);

	return {
		props: {
			singlePod: { response2 },
		},
	};
};

function FetchPodcasts({}) {
	return <div>FetchPodcasts</div>;
}

export default FetchPodcasts;
