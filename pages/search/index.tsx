import { PodcastContext } from "@/src/context/podcastContext";
import { GraphQLClient } from "graphql-request";
import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import CardSkeleton from "@/src/components/CardSkeleton";
import SinglePodcast from "@/src/components/SinglePodcast";

function SearchPage() {
	const [podcasts, setPodcasts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { setError, error } = useContext(PodcastContext);
	const [inputValue, setInputValue] = useState("");
	function fetchData() {
		setError(null);
		setLoading(true);

		const client = new GraphQLClient("https://api.taddy.org", {
			headers: {
				"X-USER-ID": "275",
				"X-API-KEY":
					"c9b56c02e3b1cbe7a56bbc09433ded1139039bcec77d335b8f5956b23d5a78471dd246321a502643d7615d8c97d0cdd01a",
			},
		});

		const query = `
  query {
    searchForTerm(term:"Billy graham", filterForTypes:PODCASTSERIES){
      searchId
      podcastSeries{
        uuid
		name
		itunesId
		description
		imageUrl
      }
    }
  }
`;

		client
			.request(query)
			.then((response: any) => {
				setPodcasts(response.searchForTerm.podcastSeries);
				setLoading(false);
				setError(null);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.message);
			});
	}

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Head key="111">
				<title>Podcast-Search</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="mx-auto mt-3 h-fit">
				<input
					onChange={(e) => setInputValue(e.target.value)}
					type="text"
					placeholder="Search Podcast..."
					className="  sticky top-3 z-40 mx-auto w-full rounded-md border-2 border-[#0f9c4a] bg-black p-1 text-white outline-1 outline-[white] placeholder:pl-2 placeholder:text-sm placeholder:text-[#6d6a6a]"
				/>
				<div className="grid h-screen content-center text-center text-white">
					{loading && <CardSkeleton cards={25} />}
					{error ? (
						<div className="flex h-screen flex-col items-center justify-center gap-2">
							<h1 className="text-center text-3xl text-[red] md:text-4xl">
								Something went wrong😥
							</h1>
							<p className="text-center text-red-600">
								Please check your internet and try again
								<span className="text-xl">😪</span>
							</p>
							<button
								onClick={fetchData}
								className=" mt-4 rounded-md bg-[#0f9c4a] py-2 px-10 text-lg text-white shadow-md active:scale-[1.1]"
							>
								Retry
							</button>
						</div>
					) : (
						<div
							className={`mt-3 grid w-full grid-cols-1 gap-4 xs:grid-cols-2
						lg:grid-cols-2
					 xl:grid-cols-3`}
						>
							{podcasts?.map((data: any) => {
								return <SinglePodcast key={data.uuid} data={data} />;
							})}
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default SearchPage;
