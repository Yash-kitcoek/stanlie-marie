import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, T} from '../constants';

const Word: React.FC<{
	children: React.ReactNode;
	frame: number;
	inAt: number;
	dur?: number;
	color?: string;
}> = ({children, frame, inAt, dur = 14, color = COLORS.white}) => {
	const p = interpolate(frame, [inAt, inAt + dur], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const y = interpolate(p, [0, 1], [14, 0]);
	return (
		<span
			style={{
				display: 'inline-block',
				opacity: p,
				transform: `translateY(${y}px)`,
				color,
			}}
		>
			{children}
		</span>
	);
};

export const IntroText: React.FC = () => {
	const frame = useCurrentFrame();

	const word1Opacity = interpolate(
		frame,
		[T.word1In, T.word1In + 18, T.word1Hold, T.word1Out],
		[0, 1, 1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const sceneOpacity = interpolate(
		frame,
		[T.introOut - 24, T.introOut],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	if (frame >= T.introOut + 2) return null;

	return (
		<AbsoluteFill
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				opacity: sceneOpacity,
			}}
		>
			{frame < T.word2In && (
				<div
					style={{
						fontFamily: 'Poppins, sans-serif',
						fontWeight: 300,
						fontSize: 46,
						letterSpacing: 1,
						color: COLORS.white,
						opacity: word1Opacity,
					}}
				>
					operations
				</div>
			)}
			{frame >= T.word2In && (
				<div
					style={{
						fontFamily: 'Poppins, sans-serif',
						fontWeight: 300,
						fontSize: 46,
						letterSpacing: 1,
						color: COLORS.dim,
						display: 'flex',
						gap: 14,
					}}
				>
					<Word frame={frame} inAt={T.word2In}>
						agentic
					</Word>
					<Word frame={frame} inAt={T.word2In + 12} color={COLORS.orangeBright}>
						AI
					</Word>
					<Word frame={frame} inAt={T.word2In + 24}>
						copilots
					</Word>
				</div>
			)}
		</AbsoluteFill>
	);
};
