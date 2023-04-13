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
					className="mx-auto w-full max-w-[320px] cursor-pointer rounded-3xl bg-[#1c1c1d] p-2 shadow-xl transition-colors hover:bg-[#1c1c1d4d] md:max-w-[250px]"
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
		<div
			className={`mt-3 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`}
		>
			{cardElements}
		</div>
	);
}

export default CardSkeleton;
