import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface data {
	id: string;
	title: string;
	audio: string;
	image: string;
}

interface podcastProp {
	data: data;
}

function SinglePodcast({ data }: podcastProp) {
	return (
		<Link
			href={`/explore/${data.id}`}
			className="mx-auto h-[270px] w-full max-w-sm cursor-pointer rounded-3xl bg-[#1c1c1d] p-2 shadow-xl transition-colors hover:bg-[#1c1c1d4d]"
		>
			<div className="h-[200px] rounded-xl">
				<Image
					className="h-full w-full rounded-3xl object-cover shadow-md"
					alt=""
					src={data.image}
					width={100}
					height={100}
				/>
			</div>
			<div className="py-1 text-left leading-[1] text-white">
				<h2 className="text-base font-medium">Kamasah Dickson</h2>
				<span className="text-sm text-[#808080]">Kamasah Dickson</span>
			</div>
		</Link>
	);
}

export default SinglePodcast;
