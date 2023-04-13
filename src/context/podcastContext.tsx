import {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";

interface PodchaserContextType {
	setPlaySinglePodcast: Dispatch<
		SetStateAction<{
			audioUrl: string;
			name: string;
			description: string;
			imageUrl: string;
			uuid: string;
		}>
	>;
	playSinglePodcast: {
		audioUrl: string;
		name: string;
		description: string;
		imageUrl: string;
		uuid: string;
	};
	setTogglePlaying: Dispatch<SetStateAction<boolean>>;
	togglePlaying: boolean;
	setError: Dispatch<SetStateAction<string | null>>;
	error: string | null;
}

export const PodcastContext = createContext<PodchaserContextType>({
	setPlaySinglePodcast: () => {},
	playSinglePodcast: {
		audioUrl: "",
		name: "",
		description: "",
		imageUrl: "",
		uuid: "",
	},
	setTogglePlaying: () => {},
	togglePlaying: true,
	setError: () => {},
	error: null,
});
interface Props {
	children: ReactNode;
}

export function PodcastProvider({ children }: Props) {
	const [playSinglePodcast, setPlaySinglePodcast] = useState({
		audioUrl: "",
		name: "",
		description: "",
		imageUrl: "",
		uuid: "",
	});

	const [togglePlaying, setTogglePlaying] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	return (
		<PodcastContext.Provider
			value={{
				playSinglePodcast,
				setPlaySinglePodcast,
				togglePlaying,
				setTogglePlaying,
				error,
				setError,
			}}
		>
			{children}
		</PodcastContext.Provider>
	);
}
