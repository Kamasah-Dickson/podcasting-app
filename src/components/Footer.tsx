import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTwitter } from "react-icons/fa";
import { BsLinkedin, BsGithub } from "react-icons/bs";

function Footer() {
	const { pathname } = useRouter();

	return (
		<div className=" my-scroll relative z-40 mt-3 bg-black py-3 px-5">
			<div className="mb-16 flex flex-col items-center justify-between gap-3 md:mb-0 md:flex-row">
				<ul className="hidden max-w-7xl gap-3 md:flex">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path && "text-[#12a34f]"
								} flex w-fit items-center gap-3 py-1 px-4 text-white hover:text-[#1eac59] active:scale-[1.2]`}
								key={data.id}
								href={data.path}
							>
								{data.name}
							</Link>
						);
					})}
				</ul>
				<p className="mt-2 text-center text-base text-white">
					Created by <span className="text-[#1e9c52]">Kamasah Dickson</span>{" "}
					with 💚
				</p>
				<div className="flex items-center gap-7">
					<Link href="">
						<BsLinkedin color="white" size={20} />
					</Link>
					<Link href="">
						<BsGithub color="white " size={20} />
					</Link>
					<Link href="">
						<FaTwitter color="white" size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Footer;
