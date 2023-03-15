import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface data {
	cid: string;
	title: string;
	audio: string;
	big_cover_url: string;
	author: string;
}

interface podcastProp {
	data: data;
}

function SinglePodcast({ data }: podcastProp) {
	return (
		<Link
			href={`/explore/${data.cid}`}
			className="mx-auto  w-full max-w-xs cursor-pointer rounded-3xl bg-[#1c1c1d] p-2 shadow-xl transition-colors hover:bg-[#1c1c1d4d]"
		>
			<div className="h-[200px] rounded-xl">
				<Image
					className="h-full w-full rounded-3xl object-cover shadow-md"
					alt=""
					src={data.big_cover_url}
					width={100}
					height={100}
				/>
			</div>
			<div className="py-1 text-left leading-[1] text-white">
				<h2 className="my-2 text-base font-medium">{data.author}</h2>
				<span className="text-sm text-[#808080]">{data.title}</span>
			</div>
		</Link>
	);
}

export default SinglePodcast;
