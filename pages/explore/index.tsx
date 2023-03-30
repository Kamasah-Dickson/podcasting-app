import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import axios from "axios";

import CardSkeleton from "@/src/components/CardSkeleton";
import SinglePodcast from "@/src/components/SinglePodcast";
interface RequestAccessTokenResponse {
	requestAccessToken: {
		access_token: string;
		token_type: string;
	};
}

function ExplorePage() {
	const [location, setLocation] = useState("");
	const [token, setToken] = useState("");

	async function getToken() {
		const clientId = "98b5a379-50ef-4496-a325-dfd20910a51f";
		const clientSecret = "Zv7QYQUshxLhxtkpa5R9lkJOVLJEI0zUngFE87Eh";
		const accessToken = await fetchAccessToken(clientId, clientSecret);
		setToken(accessToken);
	}

	async function fetchAccessToken(
		clientId: string,
		clientSecret: string
	): Promise<string> {
		const client = new GraphQLClient("https://api.podchaser.com/graphql", {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		const query = gql`
			mutation RequestAccessToken($clientId: String!, $clientSecret: String!) {
				requestAccessToken(
					input: {
						grant_type: CLIENT_CREDENTIALS
						client_id: $clientId
						client_secret: $clientSecret
					}
				) {
					access_token
					token_type
				}
			}
		`;

		const variables = {
			clientId,
			clientSecret,
		};
		const response = await client.request<RequestAccessTokenResponse>(
			query,
			variables
		);
		return response.requestAccessToken.access_token;
	}

	useEffect(() => {
		getToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		try {
			const getCountry = async () => {
				const response = await fetch("https://ipapi.co/json/");
				const data = await response.json();
				setLocation(data.country_code);
			};
			getCountry();
		} catch (error) {
			console.log(error);
		}
	}, []);

	// ==========fetching podcasts================

	const client = new GraphQLClient("https://api.podchaser.com/graphql", {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const query = gql`
		query {
			podcasts {
				data {
					title
					description
				}
			}
		}
	`;

	client.request(query).then((response: any) => {
		// Print out the first podcast's title.
		console.log(response.podcasts.data);
	});

	// ==========end of fetching podcasts================
	return (
		<></>
		// <div>
		// 	<div className="sticky top-0 left-0 z-30 mx-auto mt-5 flex w-full max-w-[400px] items-start justify-between bg-[#16151b] py-3 text-white md:mt-0 md:max-w-full md:items-center">
		// 		<h1 className="text-xl md:text-2xl">
		// 			Top <span className="text-2xl font-bold text-purple-500">Po</span>
		// 			dcasts
		// 		</h1>
		// 		<h3 className=" cursor-pointer select-none border border-[#876fc9] bg-[#36027a] p-[0.3rem] text-sm font-bold text-[#ad76f5] active:scale-[1.08]">
		// 			<Link href="/explore/popular">Explore Popular</Link>
		// 		</h3>
		// 	</div>
		// 	{loading && <CardSkeleton cards={25} />}
		// 	{error ? (
		// 		<div className="flex h-screen flex-col items-center justify-center gap-2">
		// 			<h1 className="text-center text-3xl text-[red] md:text-5xl">
		// 				{error}😥
		// 			</h1>
		// 			<p className="text-center text-red-600">
		// 				Please check your internet and or try again later
		// 				<span className="text-2xl">😪</span>
		// 			</p>
		// 		</div>
		// 	) : (
		// 		<div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
		// 			{podcast.map((data, index) => {
		// 				return <SinglePodcast key={index} data={data} />;
		// 			})}
		// 		</div>
		// 	)}
		// </div>
	);
}

export default ExplorePage;

// ==============================
