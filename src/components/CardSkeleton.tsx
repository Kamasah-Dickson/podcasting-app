import React from "react";
import Skeleton from "react-loading-skeleton";

interface cardProp {
	cards: string | number;
}
function CardSkeleton({ cards }: cardProp) {
	const cardElements = Array(cards)
		.fill(0)
		.map((data, index) => {
			return (
				<div
					key={index}
					className={`card mx-auto mt-3 grid w-full max-w-xs grid-cols-1 gap-4 ${"xs:grid-cols-2"} 
						lg:grid-cols-2
					 xl:grid-cols-3`}
				>
					<div>
						<Skeleton height={180} width={200} />
						<div>
							<Skeleton width={150} height={13} duration={1.5} />
							<Skeleton width={180} height={13} duration={1.5} />
						</div>
					</div>
				</div>
			);
		});

	return (
		<div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
			{cardElements}
		</div>
	);
}

export default CardSkeleton;
