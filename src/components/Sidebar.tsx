import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

function Sidebar() {
	const { pathname } = useRouter();

	return (
		<div className="sticky top-0 left-0 h-screen">
			<Link href="/">
				<h1 className="relative py-3 text-3xl font-medium capitalize text-white">
					<span className="text-purple-500">My</span>Podcast.
				</h1>
				<div className="absolute top-2 right-4 text-[11px] text-gray-500">
					GH
				</div>
			</Link>
			<nav>
				<ul className="mt-5 flex w-full flex-col gap-4 text-gray-400">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path && "my-hover"
								} hover:my-hover flex items-center gap-3 py-2 px-3`}
								key={data.id}
								href={`/${data.path}`}
							>
								<p className="text-xl">{data.icon}</p>
								<p>{data.name}</p>
							</Link>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
