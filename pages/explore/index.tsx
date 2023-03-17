import Link from "next/link";
import { useContext } from "react";
import { PodcastContext } from "@/podcastContext";
import CardSkeleton from "@/src/components/CardSkeleton";
import SinglePodcast from "@/src/components/SinglePodcast";

function ExplorePage() {
	const { error, podcast, loading } = useContext(PodcastContext);
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
					{podcast.map((data, index) => {
						return <SinglePodcast key={index} data={data} />;
					})}
				</div>
			)}
		</div>
	);
}

export default ExplorePage;
