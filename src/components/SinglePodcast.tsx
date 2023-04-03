import Image from "next/image";
import Link from "next/link";

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
	return (
		<Link
			href={`/explore/${data.name}`}
			className="mx-auto w-full  max-w-[250px] cursor-pointer rounded-3xl bg-[#1c1c1d] p-2 shadow-xl transition-colors hover:bg-[#1c1c1d4d]"
		>
			<div className="h-[200px] rounded-xl">
				<Image
					className="h-full w-full rounded-3xl object-cover text-white shadow-md"
					alt={data.name}
					src={data.imageUrl}
					width={100}
					height={100}
					priority
				/>
			</div>
			<div className="py-1 text-left leading-[1] text-white">
				<h2 className="my-2 text-base font-medium">
					{data?.name?.slice(0, 50)}
				</h2>
				<span className="text-xs text-[#808080]">
					{data?.description?.slice(0, 80)}...
				</span>
			</div>
		</Link>
	);
}

export default SinglePodcast;
