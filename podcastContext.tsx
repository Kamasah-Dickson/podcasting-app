import {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
	ReactNode,
} from "react";

interface PodchaserContextType {
	setSinglePodcast: Dispatch<SetStateAction<never[]>>;
	singlePodcast: never[];
}

const PodcastContext = createContext<PodchaserContextType | null>({
	setSinglePodcast: () => {},
	singlePodcast: [],
});
interface Props {
	children: ReactNode;
}

export function PodcastProvider({ children }: Props) {
	const [singlePodcast, setSinglePodcast] = useState([]);

	return (
		<PodcastContext.Provider value={{ singlePodcast, setSinglePodcast }}>
			{children}
		</PodcastContext.Provider>
	);
}
