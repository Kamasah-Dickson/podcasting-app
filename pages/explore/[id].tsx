import {
	useEffect,
	useState,
	useContext,
	SetStateAction,
	Dispatch,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PodcastContext } from "@/podcastContext";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/Skeleton.css";

interface SingleType {}

interface singleProp {
	title: string;
	author: string;
	big_cover_url: string;
	description: string;
	language: string;
	release_date: string;
}

interface episodesProp {
	cid: string;
	small_cover_url: string;
	author: string;
	description: string;
}

function ListenToSingleCast() {
	const [single, setSingle] = useState<singleProp>({
		title: "",
		author: "",
		big_cover_url: "",
		description: "",
		language: "",
		release_date: "",
	});

	const [loading, setLoading] = useState(true);
	const [episodes, setEpisodes] = useState([]);

	const { query } = useRouter();
	const { id } = query;
	const { setError, error } = useContext(PodcastContext);

	const myDate = new Date(single.release_date).toLocaleDateString("en-us", {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	useEffect(() => {
		const fetchSingles = async () => {
			try {
				const options = {
					method: "GET",
					url: "https://podcast-api1.p.rapidapi.com/channel/v3",
					params: { cid: id },
					headers: {
						"X-RapidAPI-Key":
							"3463f3b065msh692b26db6cdd5e0p1f756ajsnf4e5cc452936",
						"X-RapidAPI-Host": "podcast-api1.p.rapidapi.com",
					},
				};

				const response = await axios.request(options);

				const options2 = {
					method: "GET",
					url: "https://podcast-api1.p.rapidapi.com/episode_list/v2",
					params: { cid: id, eids: "544642284,542878320" },
					headers: {
						"X-RapidAPI-Key":
							"3463f3b065msh692b26db6cdd5e0p1f756ajsnf4e5cc452936",
						"X-RapidAPI-Host": "podcast-api1.p.rapidapi.com",
					},
				};
				const response2 = await axios.request(options2);

				setSingle(response.data.data);
				setError("");
				setLoading(false);
				setEpisodes(response2.data.data.episode_list);
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
		};
		if (id) {
			fetchSingles();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
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
				<div className="mt-3 text-3xl text-[#cbcbce]">
					<h1 className="mx-auto mb-3 max-w-[400px] text-center">
						{single.author}
					</h1>
					<div className="mx-auto grid max-w-[700px] grid-cols-1 gap-3 rounded-md bg-[#131218] p-2 shadow-sm shadow-black lg:grid-cols-2">
						{loading ? (
							<Skeleton width={200} height={200} duration={1.4} />
						) : (
							<div className=" w-full flex-1">
								<Image
									width={200}
									height={200}
									property="true"
									src={single.big_cover_url}
									alt={single.author}
									className="w-full"
								/>
							</div>
						)}
						{loading ? (
							<div>
								<div>
									<Skeleton />
									<Skeleton height={70} />
								</div>
								<div>
									<Skeleton width={140} height={22} />
									<Skeleton width={170} height={20} />
								</div>
							</div>
						) : (
							<div className="w-full flex-1">
								<h2 className="py-1 font-medium text-white">{single.title}</h2>
								<p className="text-sm text-[gray]">
									{single.description?.substring(0, 230) + "..."}
								</p>
								<div className="mt-5 text-lg text-[grey]">
									<p>
										Language:
										<span className="ml-1 text-base font-normal text-white">
											{single.language}
										</span>
									</p>
									<p>
										Date Released:
										<span className="ml-1 text-base font-normal text-white">
											{myDate.toString()}
										</span>
									</p>
								</div>
							</div>
						)}
					</div>
					<div className="mt-10">
						<h3>Episodes</h3>
						<div className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2">
							{episodes.map((data: episodesProp, index) => {
								return (
									<div
										key={data.cid + index}
										className="flex cursor-pointer items-center justify-center gap-5 rounded-lg bg-[#0b0a0fad] p-3 shadow-sm shadow-black transition-colors hover:bg-[#0a091465]"
									>
										<div className="h-[100px] w-[100px] ">
											<Image
												width={70}
												height={70}
												src={data.small_cover_url}
												alt={data.author}
												className="h-full w-full object-cover"
											/>
										</div>
										<div>
											<h3>{}</h3>
											<p className="text-base text-white">
												{data.description.substring(0, 40)}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ListenToSingleCast;
