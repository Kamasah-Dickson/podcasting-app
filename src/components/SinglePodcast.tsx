import Image from "next/image";
import Link from "next/link";
import me from "../img/EgLF6Jmi_4x.jpg";

interface data {
	imageUrl: string;
	description: string;
	name: string;
	itunesId: string | null;
	uuid: string;
}

interface podcastProp {
	data: data;
}

function SinglePodcast({ data }: podcastProp) {
	if (!data) {
		return <div>No data available</div>;
	}

	return (
		<Link
			href={`/explore/${data.name}`}
			className="mx-auto w-full max-w-[320px] cursor-pointer rounded-3xl bg-[#1c1c1d] p-2 shadow-xl transition-colors hover:bg-[#1c1c1d4d] md:max-w-[250px]"
		>
			<div className="h-[180px] rounded-xl">
				<Image
					className="h-full w-full rounded-2xl object-cover text-white shadow-md"
					alt={data.name}
					src={data.imageUrl || me}
					width={150}
					height={150}
					priority
					onError={(event) => {
						event.currentTarget.src = me.src;
					}}
				/>
			</div>
			<div className="py-1 text-left leading-[1] text-white">
				<h2 className="my-2 text-base font-medium">{data?.name}</h2>
				<span className="text-xs text-[#808080]">
					{data?.description?.slice(0, 50)}...
				</span>
			</div>
		</Link>
	);
}

export default SinglePodcast;
