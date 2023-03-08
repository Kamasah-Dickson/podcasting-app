import PlayingNow from "@/src/components/PlayingNow";
import Sidebar from "@/src/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="mx-auto flex w-full max-w-[1300px] justify-between">
			<div className="flex-[2]">
				<Sidebar />
			</div>
			<div className="flex-[10]">
				<Component {...pageProps} />
			</div>
			<div className="flex-[3]">
				<PlayingNow />
			</div>
		</div>
	);
}
