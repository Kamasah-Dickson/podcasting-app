import { sideLinks } from "@/sidebarData";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Sidebar() {
	const { pathname } = useRouter();
	const [location, setLocation] = useState("");

	useEffect(() => {
		try {
			const getCountry = async () => {
				const response = await fetch("https://ipapi.co/json/");
				const data = await response.json();
				setLocation(data.country_name);
			};
			getCountry();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<div className="fixed bottom-0 z-10  w-full bg-[#16151b] sm:sticky sm:top-0 sm:left-0 sm:h-screen">
			<Link href="/" className=" relative hidden text-center md:block">
				<h1 className="relative mx-auto w-fit py-3 text-4xl font-medium capitalize text-white">
					<span className="text-purple-500">Po</span>dcast.
					<div className="absolute top-0 -right-3 text-[11px] text-gray-500">
						{location}
					</div>
				</h1>
			</Link>
			<nav>
				<ul className="flex w-full justify-center gap-4 py-3 text-gray-400 sm:mt-5 sm:flex-col sm:py-0">
					{sideLinks.map((data) => {
						return (
							<Link
								className={` ${
									pathname === data.path && "my-hover"
								} hover:my-hover flex items-center gap-3 py-2 px-4`}
								key={data.id}
								href={`${data.path}`}
							>
								<p className="text-xl">{data.icon}</p>
								<p className="hidden md:flex">{data.name}</p>
							</Link>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default Sidebar;
