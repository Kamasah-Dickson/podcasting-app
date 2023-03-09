import Link from "next/link";
import React from "react";

function ExplorePage() {
	return (
		<div>
			<div className=" flex items-start justify-between py-3 text-white md:items-center">
				<h1>Explore</h1>
				<h3 className=" cursor-pointer select-none border border-[#876fc9] bg-[#36027a] p-[0.3rem] text-sm font-bold text-[#ad76f5] active:scale-[1.08]">
					<Link href="/explore/popular">Explore Popular</Link>
				</h3>
			</div>
		</div>
	);
}

export default ExplorePage;
