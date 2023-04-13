import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
import { TbLayoutSidebarRight } from "react-icons/tb";
import { PodcastContext } from "../context/podcastContext";

interface locationProp {
	location: string;
	setShowPlaying: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ location, setShowPlaying }: locationProp) {
	const { pathname } = useRouter();
	const { togglePlaying, setTogglePlaying } = useContext(PodcastContext);

	return (
		<div
			className={`fixed left-0 bottom-0 w-full border-t-4 ${
				togglePlaying
					? "border-green-500"
					: "border-[#2d0796] md:border-[#0f9c4a]"
			} bg-[#060807] sm:sticky sm:top-0 sm:left-0 sm:h-screen sm:border-none sm:bg-transparent`}
		>
			<Link href="/explore" className=" relative hidden text-center md:block">
				<h1 className="relative mx-auto w-fit py-3 text-4xl font-medium capitalize text-white">
					<span className="text-[#0f9c4a]">myPo</span>dcast.
					<div className="absolute -top-2 -right-3 text-[11px] text-gray-500">
						{location}
					</div>
				</h1>
			</Link>
			<nav className="my-scroll mx-auto w-full overflow-auto xs:w-fit xs:overflow-hidden">
				<ul className="flex w-full justify-center gap-4 px-3 py-3 text-gray-400 xs:w-fit sm:mt-5 sm:flex-col md:py-0">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path &&
									`${togglePlaying ? " my-hover" : "sm:my-hover my-hover2"}`
								}   flex w-fit ${
									togglePlaying
										? "hover:my-hover"
										: "sm:hover:my-hover hover:my-hover2"
								} items-center gap-3 rounded-md py-2 px-4 active:scale-[1.2]`}
								key={data.id}
								href={`${data.path}`}
							>
								<p className="text-xl">{data.icon}</p>
								<p className="hidden md:flex">{data.name}</p>
							</Link>
						);
					})}

					<button
						onClick={() => (
							setTogglePlaying((prev) => !prev), setShowPlaying((prev) => !prev)
						)}
						className={` ${
							togglePlaying
								? "hover:my-hover"
								: "my-hover2 sm:my-hover hover:my-hover2 sm:hover:my-hover"
						}  flex w-fit items-center gap-3 rounded-md py-2 px-4 active:scale-[1.2] lg:hidden`}
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
