import PlayingNow from "@/src/components/PlayingNow";
import Sidebar from "@/src/components/Sidebar";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useEffect, useContext } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { PodcastContext, PodcastProvider } from "@/src/context/podcastContext";
import Footer from "@/src/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	const path = useRouter();
	const { pathname } = path;
	const [location, setLocation] = useState<string>("");
	const [showPlaying, setShowPlaying] = useState(true);
	const { playSinglePodcast, error } = useContext(PodcastContext);

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
			<SkeletonTheme baseColor="#1c1c1d" highlightColor="#515151">
				<div className="my-max mx-auto grid w-full grid-cols-1 gap-1 pt-3 sm:flex sm:justify-between sm:gap-3 md:pt-0">
					<div className="sticky top-0 z-50 row-start-3 flex flex-1 md:flex-[1.5]">
						<Sidebar setShowPlaying={setShowPlaying} location={location} />
					</div>
					<main className={`row-start-1 shrink sm:flex-[3.5]`}>
						<Link
							href="/explore"
							className=" relative block text-center md:hidden"
						>
							<h1 className="relative mx-auto w-fit py-3 text-4xl font-medium capitalize text-white">
								<span className="text-[#0f9c4a]">myPo</span>dcast.
								<div className="absolute -top-2 -right-3 text-[11px] text-gray-500">
									{location}
								</div>
							</h1>
						</Link>
						<div>
							<Component {...pageProps} />
						</div>
					</main>

					<div
						className={`fixed ${showPlaying && "lg:my-block hidden"}
						"my-scroll xl:flex-[2]" my-scroll top-0 left-0 z-30 row-start-2 mx-auto block h-[100vh] w-full overflow-y-auto bg-[#0a0825ee] sm:fixed sm:h-full sm:flex-[2] sm:bg-transparent sm:py-0 md:flex-[3] lg:sticky xl:flex-[2]
						`}
					>
						{!error && (
							<p className="ml-16 pt-3 text-2xl font-bold text-white sm:hidden">
								Playing Now...
							</p>
						)}
						<PlayingNow />
					</div>
				</div>
				<Footer />
			</SkeletonTheme>
		</PodcastProvider>
	);
}
