import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import { StaticImageData } from "next/image";

interface podcast {
	id: string;
	title: string;
	audio: string;
	author: string;
	big_cover_url: string;
}

interface podcastType {
	podcast: podcast[];
	error: string;
	loading: boolean;
}

export const PodcastContext = createContext<podcastType>({
	podcast: [],
	error: "",
	loading: true,
});

interface Props {
	children: ReactNode;
}

export function PodcastProvider({ children }: Props) {
	const [podcast, setPodcast] = useState<podcast[]>([]);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setLoading(false);
		const fetchPodcasts = async () => {
			try {
				const response = await fetch("https://ipapi.co/json/");
				const { country_code } = await response.json();
				console.log(country_code);

				const options = {
					method: "GET",
					url: "https://podcast-api1.p.rapidapi.com/top_channels/v2",
					params: { category_id: "10030", country: country_code },
					headers: {
						"X-RapidAPI-Key":
							"3463f3b065msh692b26db6cdd5e0p1f756ajsnf4e5cc452936",
						"X-RapidAPI-Host": "podcast-api1.p.rapidapi.com",
					},
				};

				const response2 = await axios.request(options);
				setPodcast(response2.data.data.list.slice(0, 25));
			} catch (error: any) {
				console.error(error);
				setError(error.message);
			}
		};

		fetchPodcasts();
	}, []);

	return (
		<PodcastContext.Provider value={{ podcast, error, loading }}>
			{children}
		</PodcastContext.Provider>
	);
}