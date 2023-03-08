import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PlayingNow() {
	return (
		<div className="sticky top-0 right-0 h-screen w-full">
			PlayingNow
			<AudioPlayer
				autoPlay={false}
				src="https://example.com/podcast.mp3"
				onPlay={() => console.log("onPlay")}
				loop={false}
				className="me"
				// controls={['play-pause', 'current-time', 'progress', 'duration', 'mute', 'volume']}
			/>
		</div>
	);
}

export default PlayingNow;
