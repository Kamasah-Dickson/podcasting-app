import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import CardSkeleton from "@/src/components/CardSkeleton";
import SinglePodcast from "@/src/components/SinglePodcast";
import Link from "next/link";

function ExplorePage() {
	const [podcasts, setPodcasts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const client = new GraphQLClient("https://api.taddy.org", {
			headers: {
				"X-USER-ID": "275",
				"X-API-KEY":
					"c9b56c02e3b1cbe7a56bbc09433ded1139039bcec77d335b8f5956b23d5a78471dd246321a502643d7615d8c97d0cdd01a",
			},
		});

		const query = `
  query {
	  getMultiplePodcastSeries(uuids:[	
	  	"762eb657-df93-4cfe-8699-ec34552aeaf9",
		"08c861b2-930b-4919-a24a-3489c7e1a40d",
		"8710840e-572f-46a2-a53c-5bffc26d71b2",
		"fd50cfe2-de9c-4684-bc39-13a7470e6a66",
		"1db200bd-d645-4e37-b700-1d660e7016fe",
		"5be08a07-06b6-426d-8445-0fc47e959547",
		"de11cc1c-4d72-4ff7-9620-3cba361b53b0",
		"5b68e721-b0ef-4ea5-801a-348a6d493549",
		"ab4d5e01-5de0-4272-ba75-8a16db8a9e8a",
		"242f0eaa-5165-41db-8bb4-7e1e56f99d2f",
		"232491f8-92ee-4564-b650-c60305e529d7",
		]){
		  uuid
		  name
		  itunesId
		  description
		  imageUrl
		  itunesInfo{
			uuid
			publisherName
			baseArtworkUrlOf(size: 640)
		  }
		}
	  }
	
	
`;

		// ======search=====================

		// searchForTerm(term:"Billy Graham", filterForTypes:[PODCASTSERIES]){
		// 	searchId
		// 	podcastSeries{
		// 	  uuid
		// 	  name
		// 	  rssUrl
		// 	}
		// 	podcastEpisodes{
		// 	  uuid
		// 	  name
		// 	  audioUrl
		// 	}
		//   }

		// getMultiplePodcastSeries(uuids:[

		// ];){
		// 	uuid
		// 	name
		// 	itunesId
		// 	description
		// 	imageUrl
		// 	itunesInfo{
		// 	  uuid
		// 	  publisherName
		// 	}
		//   }
		// ===========end of search=====================
		client
			.request(query)
			.then((response: any) => {
				setPodcasts(response.getMultiplePodcastSeries);
				console.log(response.getMultiplePodcastSeries);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.message);
			});
	}, []);

	// ==========end of fetching podcasts================
	return (
		<div>
			<div className="sticky top-0 left-0 z-30 mx-auto mt-5 flex w-full max-w-[400px] items-start justify-between bg-[#16151b] py-3 text-white md:mt-0 md:max-w-full md:items-center">
				<h1 className="text-xl md:text-2xl">
					Top <span className="text-2xl font-bold text-purple-500">Po</span>
					dcasts
				</h1>
				<h3 className=" cursor-pointer select-none border border-[#876fc9] bg-[#36027a] p-[0.3rem] text-sm font-bold text-[#ad76f5] active:scale-[1.08]">
					<Link href="/explore/popular">Explore Popular</Link>
				</h3>
			</div>
			{loading && <CardSkeleton cards={25} />}
			{error ? (
				<div className="flex h-screen flex-col items-center justify-center gap-2">
					<h1 className="text-center text-3xl text-[red] md:text-5xl">
						{error}😥
					</h1>
					<p className="text-center text-red-600">
						Please check your internet and or try again later
						<span className="text-2xl">😪</span>
					</p>
				</div>
			) : (
				<div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
					{podcasts.map((data: any) => {
						return <SinglePodcast key={data.id} data={data} />;
					})}
				</div>
			)}
		</div>
	);
}

export default ExplorePage;

// ==============================
// useEffect(() => {
// 	try {
// 		const getCountry = async () => {
// 			const response = await fetch("https://ipapi.co/json/");
// 			const data = await response.json();
// 			setLocation(data.country_code);
// 		};
// 		getCountry();
// 	} catch (error) {
// 		console.log(error);
// 	}
// }, []);

// const query = gql`
// 	mutation getToken($client_id: String!, $client_secret: String!) {
// 		requestAccessToken(
// 			input: {
// 				grant_type: CLIENT_CREDENTIALS
// 				client_id: $client_id
// 				client_secret: $client_secret
// 			}
// 		) {
// 			access_token
// 			token_type
// 		}
// 	}
// `;
// const variables = {
// 	client_id: "98b5a379-50ef-4496-a325-dfd20910a51f",
// 	client_secret: "wh4L0bnoEEAhcmTt8mhw3KPAO1gIH7DMkp2Fwbqa",
// };

// const client = new GraphQLClient("https://api.podchaser.com/graphql");

// client.request(query, variables).then((response: any) => {
// 	console.log(response.requestAccessToken.access_token);
// 	setToken(response.requestAccessToken.access_token);
// });
