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

	return (
		<PodcastContext.Provider
			value={{ playSinglePodcast, setPlaySinglePodcast }}
		>
			{children}
		</PodcastContext.Provider>
	);
}
