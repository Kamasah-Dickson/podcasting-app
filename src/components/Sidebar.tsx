import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { TbLayoutSidebarRight } from "react-icons/tb";
import { PodcastContext } from "../context/podcastContext";

interface locationProp {
	location: string;
}

function Sidebar({ location }: locationProp) {
	const { pathname } = useRouter();
	const { togglePlaying, setTogglePlaying } = useContext(PodcastContext);

	return (
		<div className="fixed left-0 bottom-0 z-20  w-full bg-[#16151b] sm:sticky sm:top-0 sm:left-0 sm:h-screen">
			<Link href="/explore" className=" relative hidden text-center md:block">
				<h1 className="relative mx-auto w-fit py-3 text-4xl font-medium capitalize text-white">
					<span className="text-purple-500">Po</span>dcast.
					<div className="absolute -top-2 -right-3 text-[11px] text-gray-500">
						{location}
					</div>
				</h1>
			</Link>
			<nav className="mx-auto w-fit">
				<ul className="flex w-fit justify-center gap-4 py-3 text-gray-400 sm:mt-5 sm:flex-col sm:py-0">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path && "my-hover"
								} hover:my-hover flex w-fit items-center gap-3 py-2 px-4 active:scale-[1.2]`}
								key={data.id}
								href={`${data.path}`}
							>
								<p className="text-xl">{data.icon}</p>
								<p className="hidden md:flex">{data.name}</p>
							</Link>
						);
					})}

					{/* change this to toggle playing now */}
					<button
						onClick={() => setTogglePlaying((prev) => !prev)}
						className={` ${
							togglePlaying ? null : "my-hover"
						} hover:my-hover flex w-fit items-center gap-3 py-2 px-4 active:scale-[1.2] xl:hidden`}
					>
						<p className="text-xl">
							<TbLayoutSidebarRight />
						</p>
						<p className="hidden md:flex">Playing now</p>
					</button>
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
