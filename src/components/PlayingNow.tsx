import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import me from "../img/EgLF6Jmi_4x.jpg";
import Image from "next/image";

function PlayingNow() {
	return (
		<div className="pt-3 md:sticky md:top-0 md:right-0 md:h-screen md:w-full">
			<div className="rounded-lg bg-[#2d0796] p-3 md:p-5">
				<div className="h-[240px] w-full rounded-2xl p-1 md:p-0">
					<Image
						src={me}
						alt="sdfsd"
						className=" h-full w-full rounded-2xl object-cover"
					/>
				</div>
				<div className="p-2 text-center text-white">
					<h1>Titledfgdfgdfgfdgfgdfgf</h1>
					<h1>sub titlesdfds</h1>
				</div>
				<AudioPlayer
					autoPlay={false}
					src="/bensound-elevate.mp3"
					loop={false}
					className="me"
				/>
			</div>
		</div>
	);
}

export default PlayingNow;
