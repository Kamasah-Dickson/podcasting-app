import { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import { StaticImageData } from "next/image";

interface podcast {
	id: string;
	title: string;
	audio: string;
	image: string;
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
	const [countrycode, setCountrycode] = useState("");

	useEffect(() => {
		setLoading(false);
		const fetchPodcasts = async () => {
			try {
				const response1 = await fetch("https://ipapi.co/json/");
				const { country_code } = await response1.json();
				setCountrycode(country_code);
				const response2 = await axios.get(
					`https://listen-api.listennotes.com/api/v2/best_podcasts?page=1&country=gh&sort=listen_score&safe_mode=0`,

					{
						headers: {
							"X-ListenAPI-Key": "732e9fdfa7b24ea99aec390d986df8be",
						},
					}
				);
				setPodcast(response2.data.podcasts);
				setError("");
			} catch (error: any) {
				console.log(error);
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
