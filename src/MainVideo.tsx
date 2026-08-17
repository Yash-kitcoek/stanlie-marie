import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {FontFaces, FONT_FAMILY} from './fonts';
import {Background} from './components/Background';
import {IntroText} from './components/IntroText';
import {ParticleField} from './components/ParticleField';
import {FrameReveal} from './components/FrameReveal';
import {CopilotOrbit} from './components/CopilotOrbit';
import {STANLEY, MARIE} from './data';
import {T, WIDTH, HEIGHT, EXPORT_WIDTH, EXPORT_HEIGHT} from './constants';

const SCALE = EXPORT_WIDTH / WIDTH;

export const MainVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: '#03070c', overflow: 'hidden'}}>
			<FontFaces />
			<div
				style={{
					width: WIDTH,
					height: HEIGHT,
					transform: `scale(${SCALE})`,
					transformOrigin: 'top left',
					fontFamily: FONT_FAMILY,
					position: 'relative',
				}}
			>
				<Background />

			<IntroText />
			<ParticleField />
			<FrameReveal />

			<CopilotOrbit
				data={STANLEY}
				activeFrom={T.stanleyStart}
				doEntrance
				nameTypeStart={T.nameTypeStart}
				taglineStart={T.taglineIn}
				captionStart={T.stanleyCaptionStart}
				nodeStarts={[T.stanleyNode1, T.stanleyNode2, T.stanleyNode3]}
				textFadeOutStart={T.morphStart}
				textFadeOutEnd={T.morphEnd}
			/>

			<CopilotOrbit
				data={MARIE}
				activeFrom={T.marieStart}
				doEntrance={false}
				nameTypeStart={T.morphStart + 6}
				taglineStart={T.morphEnd - 4}
				captionStart={T.marieCaptionStart}
				nodeStarts={[T.marieNode1, T.marieNode2, T.marieNode3]}
				textFadeInStart={T.morphStart}
				textFadeInEnd={T.morphEnd}
			/>

			</div>

			<Audio src={staticFile('narration.mp3')} />
		</AbsoluteFill>
	);
};
