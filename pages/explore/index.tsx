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

		client
			.request(query)
			.then((response: any) => {
				setPodcasts(response.getMultiplePodcastSeries);
				setLoading(false);
				setError(null);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.message);
			});
	}, []);

	return (
		<div>
			<div className="sticky top-0 left-0 z-30 mx-auto mt-5 hidden w-full max-w-[400px] bg-[#16151b] py-3 text-white md:mt-0 md:flex md:max-w-full">
				<h1 className="text-xl md:text-2xl">
					<span className="text-3xl font-bold text-purple-500">Po</span>
					dcasts
				</h1>
			</div>
			{loading && <CardSkeleton cards={25} />}
			{error ? (
				<div className="flex h-screen flex-col items-center justify-center gap-2">
					<h1 className="text-center text-3xl text-[red] md:text-5xl">
						Something went wrong😥
					</h1>
					<p className="text-center text-red-600">
						Please check your internet and try again
						<span className="text-2xl">😪</span>
					</p>
				</div>
			) : (
				<div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
					{podcasts.map((data: any) => {
						return <SinglePodcast key={data.uuid} data={data} />;
					})}
				</div>
			)}
		</div>
	);
}

export default ExplorePage;
