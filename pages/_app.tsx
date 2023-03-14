import PlayingNow from "@/src/components/PlayingNow";
import Sidebar from "@/src/components/Sidebar";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { PodcastProvider } from "@/podcastContext";

export default function App({ Component, pageProps }: AppProps) {
	const path = useRouter();
	const { pathname } = path;
	const [location, setLocation] = useState<string>("");
	const [playing, setPlaying] = useState<boolean>(false);

	useEffect(() => {
		pathname == "/" && path.push("/explore");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

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

	return (
		<PodcastProvider>
			<div className="my-max mx-auto grid w-full grid-cols-1 gap-1 pt-3 sm:flex sm:justify-between sm:gap-3 md:pt-0">
				<div className="row-start-3 flex flex-1 md:flex-[2]">
					<Sidebar
						location={location}
						setPlaying={setPlaying}
						playing={playing}
					/>
				</div>
				<main className="row-start-1 sm:flex-[4]">
					<Link
						href="/explore"
						className=" relative block text-center md:hidden"
					>
						<h1 className="relative mx-auto w-fit py-3 text-4xl font-medium capitalize text-white">
							<span className="text-purple-500">Po</span>dcast.
							<div className="absolute -top-2 -right-3 text-[11px] text-gray-500">
								{location}
							</div>
						</h1>
					</Link>
					<div>
						<Component {...pageProps} />
					</div>
				</main>

				<div className="row-start-2 mx-auto w-full sm:flex-[2]">
					<PlayingNow playing={playing} setPlaying={setPlaying} />
				</div>
			</div>
		</PodcastProvider>
	);
}
