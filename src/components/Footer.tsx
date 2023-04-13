import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTwitter } from "react-icons/fa";
import { BsLinkedin, BsGithub } from "react-icons/bs";

function Footer() {
	const { pathname } = useRouter();

	return (
		<div className=" my-scroll sticky -bottom-32 left-0 z-20 mt-3 w-full bg-black py-3 sm:fixed sm:bottom-0 lg:relative lg:px-5">
			<div className="mb-20 flex flex-col justify-center gap-3 sm:mb-0 sm:flex-row ">
				<ul className="mx-auto hidden flex-1 gap-1 lg:flex lg:max-w-full">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path && "text-[#1eac59]"
								} flex w-fit items-center py-1 px-4 text-sm text-white hover:text-[#1eac59] active:scale-[1.2]`}
								key={data.id}
								href={data.path}
							>
								{data.name}
							</Link>
						);
					})}
				</ul>
				<div className=" flex flex-1 items-center justify-center gap-7">
					<Link href="">
						<BsLinkedin color="white" size={15} />
					</Link>
					<Link href="">
						<BsGithub color="white " size={15} />
					</Link>
					<Link href="">
						<FaTwitter color="white" size={15} />
					</Link>
				</div>
				<p className="flex-1 text-center text-sm text-white sm:flex-[2]">
					Created by <span className="text-[#1e9c52]">Kamasah Dickson</span>{" "}
					with 💚
				</p>
				<p className="flex-1 text-center text-sm text-white sm:flex-[2]">
					&copy;
					<span className="text-[#1e9c52]">{` ${new Date().getFullYear()} `}</span>{" "}
					All rights reserved
				</p>
			</div>
		</div>
	);
}

export default Footer;
