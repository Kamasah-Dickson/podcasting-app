import { createContext, ReactNode } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

interface PodchaserContextType {
	client: ApolloClient<any>;
}

const client = new ApolloClient({
	uri: "https://api.podchaser.com/graphql",
	headers: {
		Authorization: "98b5a379-50ef-4496-a325-dfd20910a51f",
	},
	cache: new InMemoryCache(),
});

const PodcastContext = createContext<PodchaserContextType | null>(null);
interface Props {
	children: ReactNode;
}

export function PodcastProvider({ children }: Props) {
	return (
		<PodcastContext.Provider value={{ client }}>
			{children}
		</PodcastContext.Provider>
	);
}
