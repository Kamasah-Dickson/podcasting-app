declare module "next-progressbar" {
	export interface ProgressBarProps {
		color?: string;
		startPosition?: number;
		stopDelayMs?: number;
		height?: number;
		options?: {
			showSpinner?: boolean;
			trickleSpeed?: number;
			barPercentage?: number;
			minimum?: number;
		};
	}

	export default function ProgressBar(props: ProgressBarProps): JSX.Element;
}
