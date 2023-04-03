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
	togglePlaying: false,
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

	const [togglePlaying, setTogglePlaying] = useState<boolean>(false);

	return (
		<PodcastContext.Provider
			value={{
				playSinglePodcast,
				setPlaySinglePodcast,
				togglePlaying,
				setTogglePlaying,
			}}
		>
			{children}
		</PodcastContext.Provider>
	);
}
