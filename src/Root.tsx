import React from 'react';
import {Composition} from 'remotion';
import {MainVideo} from './MainVideo';
import {FPS, TOTAL_FRAMES, EXPORT_WIDTH, EXPORT_HEIGHT} from './constants';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="MainVideo"
				component={MainVideo}
				durationInFrames={TOTAL_FRAMES}
				fps={FPS}
				width={EXPORT_WIDTH}
				height={EXPORT_HEIGHT}
			/>
		</>
	);
};
