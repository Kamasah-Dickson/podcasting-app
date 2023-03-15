import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { PodcastContext } from "@/podcastContext";

function ListenToSingleCast() {
	const [single, setSingle] = useState([{}]);
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
				console.log(response.data.data);
			} catch (error: any) {
				setError(error.message);
			}
		};

		fetchSingles();
	}, []);

	return <div>ListenToSingleCast</div>;
}

export default ListenToSingleCast;
