import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, T, WIDTH, HEIGHT} from '../constants';
import {easeInOutCubic, easeOutCubic, typeOn} from '../utils';

const RING_COUNT = 4;

type Phrase = {
	text: string;
	start: number;
	typeDur: number;
	holdEnd: number;
	fadeEnd: number;
};

const PHRASES: Phrase[] = [
	{text: 'amplify human intelligence', start: T.phrase1, typeDur: 34, holdEnd: 298, fadeEnd: 306},
	{text: 'and strengthen every', start: T.phrase2, typeDur: 28, holdEnd: 342, fadeEnd: 350},
	{text: 'part of your lab', start: T.phrase3, typeDur: 24, holdEnd: 392, fadeEnd: 398},
];

export const FrameReveal: React.FC = () => {
	const frame = useCurrentFrame();

	if (frame < T.frameIn - 4 || frame > T.dotBorn + 2) return null;

	const cx = WIDTH / 2;
	const cy = HEIGHT / 2;

	// Entrance of the nested rectangles.
	const entrance = easeOutCubic(
		interpolate(frame, [T.frameIn, T.frameIn + 20], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		})
	);

	// 3D tilt building up as the last phrase plays.
	const tilt = easeInOutCubic(
		interpolate(frame, [T.frameTilt, T.frameCollapse - 6], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		})
	);

	// Collapse into the seed dot.
	const collapse = interpolate(frame, [T.frameCollapse - 6, T.frameCollapse + 4], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const collapseEase = easeInOutCubic(collapse);

	const groupScale = entrance * (1 - collapseEase);
	const groupOpacity = entrance * (1 - collapseEase * 0.92);

	const rotateY = tilt * 34;
	const rotateX = tilt * -10;
	const skew = tilt * -6;

	// Active phrase + typed substring.
	let typed = '';
	let phraseOpacity = 1;
	for (const p of PHRASES) {
		if (frame >= p.start && frame < p.fadeEnd) {
			typed = typeOn(p.text, frame, p.start, p.start + p.typeDur);
			if (frame > p.holdEnd) {
				phraseOpacity = interpolate(frame, [p.holdEnd, p.fadeEnd], [1, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
			}
			break;
		}
	}

	const baseW = 560;
	const baseH = 200;
	const innerW = 300;
	const innerH = 66;

	// The seed dot that appears right as the frame finishes collapsing.
	const dotOpacity = interpolate(frame, [T.frameCollapse - 2, T.frameCollapse + 4], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const dotScale = interpolate(frame, [T.frameCollapse - 2, T.dotBorn], [0.2, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
			<div
				style={{
					position: 'absolute',
					left: cx,
					top: cy,
					perspective: 1200,
				}}
			>
				<div
					style={{
						transform: `translate(-50%, -50%) scale(${groupScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) skewY(${skew}deg)`,
						opacity: groupOpacity,
						transformStyle: 'preserve-3d',
					}}
				>
					<svg
						width={baseW + 40}
						height={baseH + 40}
						style={{overflow: 'visible', display: 'block'}}
					>
						<g transform={`translate(${(baseW + 40) / 2}, ${(baseH + 40) / 2})`}>
							{Array.from({length: RING_COUNT}).map((_, i) => {
								const grow = 1 + i * 0.16;
								const w = baseW * grow;
								const h = baseH * grow;
								return (
									<rect
										key={i}
										x={-w / 2}
										y={-h / 2}
										width={w}
										height={h}
										fill="none"
										stroke={COLORS.lineSoft}
										strokeWidth={1}
									/>
								);
							})}
							<rect
								x={-innerW / 2}
								y={-innerH / 2}
								width={innerW}
								height={innerH}
								fill="none"
								stroke={COLORS.line}
								strokeWidth={1.4}
							/>
						</g>
					</svg>
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
							width: innerW - 20,
							textAlign: 'center',
							fontFamily: 'Poppins, sans-serif',
							fontWeight: 400,
							fontSize: 17,
							color: COLORS.white,
							opacity: phraseOpacity,
							whiteSpace: 'nowrap',
						}}
					>
						{typed}
					</div>
				</div>
			</div>
			{frame >= T.frameCollapse - 2 && (
				<div
					style={{
						position: 'absolute',
						left: cx,
						top: cy,
						width: 46,
						height: 46,
						borderRadius: '50%',
						background: COLORS.white,
						transform: `translate(-50%, -50%) scale(${dotScale})`,
						opacity: dotOpacity,
						boxShadow: '0 0 30px rgba(255,255,255,0.6)',
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
