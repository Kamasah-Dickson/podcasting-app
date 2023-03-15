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
interface singleType {
	title: string;
	author: string;
	big_cover_url: string;
}

type singleProp = {
	single: singleType;
	setSingle: Dispatch<SetStateAction<{}[]>>;
};

function ListenToSingleCast() {
	const [single, setSingle] = useState<singleProp | any>([{}]);
	const { query } = useRouter();
	const { id } = query;

	const { setError } = useContext(PodcastContext);
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
				setSingle(response.data.data);
				console.log(response.data.data);
			} catch (error: any) {
				setError(error.message);
			}
		};

		fetchSingles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="mt-3 text-3xl text-[#cbcbce]">
			<h1 className="mb-3">{single.author}</h1>
			<div>
				<div>
					<Image
						width={100}
						height={100}
						src={single.big_cover_url}
						alt={single.author}
					/>
				</div>
			</div>
		</div>
	);
}

export default ListenToSingleCast;
