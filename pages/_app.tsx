import PlayingNow from "@/src/components/PlayingNow";
import Sidebar from "@/src/components/Sidebar";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
	const path = useRouter();

	useEffect(() => {
		path.push("/explore");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="my-max mx-auto grid w-full grid-cols-1 gap-5 pt-3 sm:flex sm:justify-between sm:gap-7 md:pt-0">
				<div className="row-start-3 sm:flex-[2]">
					<Sidebar />
				</div>
				<main className="row-start-1 sm:flex-[9]">
					<Link href="/" className=" relative block text-center md:hidden">
						<h1 className="relative mx-auto w-fit py-3 text-4xl font-medium capitalize text-white">
							<span className="text-purple-500">Po</span>dcast.
							<div className="absolute top-0 -right-3 text-[11px] text-gray-500">
								GH
							</div>
						</h1>
					</Link>
					<div className="hidden sm:block">
						<Component {...pageProps} />
					</div>
				</main>
				<div className="block h-screen sm:hidden sm:h-full">
					<Component {...pageProps} />
				</div>
				<div className="row-start-2 mx-auto w-full max-w-[300px] sm:flex-[4]">
					<PlayingNow />
				</div>
			</div>
		</>
	);
}
