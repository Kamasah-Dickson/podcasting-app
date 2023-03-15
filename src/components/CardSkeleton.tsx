import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/Skeleton.css";

interface cardProp {
	cards: string | number;
}
function CardSkeleton({ cards }: cardProp) {
	const cardElements = Array(cards)
		.fill(0)
		.map((data, index) => {
			return (
				<>
					<div key={index} className="card w-full max-w-xs">
						<Skeleton height={180} width={200} baseColor="#1c1c1d" />
						<div>
							<Skeleton
								width={150}
								height={13}
								duration={1.5}
								baseColor="#1c1c1d"
								highlightColor="#515151"
							/>
							<Skeleton
								width={180}
								height={13}
								duration={1.5}
								baseColor="#1c1c1d"
								highlightColor="#515151"
							/>
						</div>
					</div>
				</>
			);
		});

	return (
		<div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
			{cardElements}
		</div>
	);
}

export default CardSkeleton;
