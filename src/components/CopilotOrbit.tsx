import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, WIDTH, HEIGHT} from '../constants';
import {typeOn, easeOutCubic} from '../utils';
import {CopilotData} from '../data';
import {IconByName} from './icons';

const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const CIRCLE_OUTER_R = 235;
const CIRCLE_INNER_R = 215;
const NODE_R = 64;
const ORBIT_DIST = 520;

type Props = {
	data: CopilotData;
	activeFrom: number;
	doEntrance: boolean;
	nameTypeStart: number;
	taglineStart: number;
	captionStart: number;
	nodeStarts: [number, number, number];
	textFadeOutStart?: number;
	textFadeOutEnd?: number;
	textFadeInStart?: number;
	textFadeInEnd?: number;
};

const nodePos = (angleDeg: number, dist: number) => {
	const a = (angleDeg * Math.PI) / 180;
	return {
		x: CX + Math.sin(a) * dist,
		y: CY - Math.cos(a) * dist,
	};
};

export const CopilotOrbit: React.FC<Props> = ({
	data,
	activeFrom,
	doEntrance,
	nameTypeStart,
	taglineStart,
	captionStart,
	nodeStarts,
	textFadeOutStart,
	textFadeOutEnd,
	textFadeInStart,
	textFadeInEnd,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	if (frame < activeFrom - 2) return null;

	const entrance = doEntrance
		? spring({frame: frame - activeFrom, fps, config: {damping: 14, mass: 0.6}})
		: 1;

	const circleScale = doEntrance ? interpolate(entrance, [0, 1], [0.15, 1]) : 1;
	const circleOpacity = doEntrance
		? interpolate(frame, [activeFrom, activeFrom + 8], [0, 1], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
		  })
		: 1;

	// Crossfade of name/tagline/caption/nodes text layer (used for the
	// Stanley -> Marie handoff).
	let textOpacity = 1;
	if (textFadeOutStart !== undefined && textFadeOutEnd !== undefined) {
		textOpacity = interpolate(frame, [textFadeOutStart, textFadeOutEnd], [1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
	}
	if (textFadeInStart !== undefined && textFadeInEnd !== undefined) {
		textOpacity = interpolate(frame, [textFadeInStart, textFadeInEnd], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
	}

	const nameTyped = typeOn(data.name, frame, nameTypeStart, nameTypeStart + data.name.length * 3.2);
	const taglineOpacity = interpolate(frame, [taglineStart, taglineStart + 14], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const captionTyped = typeOn(
		data.caption,
		frame,
		captionStart,
		captionStart + data.caption.length * 1.05
	);

	return (
		<AbsoluteFill>
			{/* Caption paragraph, top-left */}
			<div
				style={{
					position: 'absolute',
					left: 150,
					top: 108,
					width: 660,
					fontFamily: 'Poppins, sans-serif',
					fontWeight: 300,
					fontSize: 19,
					lineHeight: 1.55,
					color: 'rgba(255,255,255,0.82)',
					opacity: textOpacity,
				}}
			>
				{captionTyped}
			</div>

			{/* Connector lines + nodes (behind the main circle bg but above lines) */}
			<svg
				width={WIDTH}
				height={HEIGHT}
				style={{position: 'absolute', inset: 0}}
			>
				{data.nodes.map((n, i) => {
					const start = nodeStarts[i];
					const pos = nodePos(n.angle, ORBIT_DIST);
					const edge = nodePos(n.angle, CIRCLE_OUTER_R);
					const lineP = interpolate(frame, [start, start + 16], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					const lx = edge.x + (pos.x - edge.x) * lineP;
					const ly = edge.y + (pos.y - edge.y) * lineP;
					return (
						<line
							key={i}
							x1={edge.x}
							y1={edge.y}
							x2={lx}
							y2={ly}
							stroke={COLORS.line}
							strokeWidth={1.4}
							opacity={textOpacity}
						/>
					);
				})}
			</svg>

			{/* Main circle */}
			<div
				style={{
					position: 'absolute',
					left: CX,
					top: CY,
					width: CIRCLE_OUTER_R * 2,
					height: CIRCLE_OUTER_R * 2,
					transform: `translate(-50%, -50%) scale(${circleScale})`,
					opacity: circleOpacity,
					borderRadius: '50%',
					border: `1px solid ${COLORS.lineSoft}`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: CIRCLE_INNER_R * 2,
						height: CIRCLE_INNER_R * 2,
						transform: 'translate(-50%, -50%)',
						borderRadius: '50%',
						background: COLORS.white,
						boxShadow: '0 0 70px rgba(255,255,255,0.18)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							fontFamily: 'Poppins, sans-serif',
							fontWeight: 400,
							fontSize: 58,
							color: COLORS.orange,
							opacity: textOpacity,
						}}
					>
						{nameTyped}
					</div>
					<div
						style={{
							fontFamily: 'Poppins, sans-serif',
							fontWeight: 400,
							fontSize: 17,
							color: '#3a3a3a',
							opacity: taglineOpacity * textOpacity,
							marginTop: 2,
						}}
					>
						{data.tagline}
					</div>
				</div>
			</div>

			{/* Node bubbles + labels */}
			{data.nodes.map((n, i) => {
				const start = nodeStarts[i];
				const pos = nodePos(n.angle, ORBIT_DIST);
				const bubbleP = easeOutCubic(
					interpolate(frame, [start + 12, start + 26], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})
				);
				const labelOpacity = interpolate(frame, [start + 18, start + 32], [0, 1], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});
				const onRight = Math.sin((n.angle * Math.PI) / 180) >= 0;
				return (
					<React.Fragment key={i}>
						<div
							style={{
								position: 'absolute',
								left: pos.x,
								top: pos.y,
								width: NODE_R * 2,
								height: NODE_R * 2,
								transform: `translate(-50%, -50%) scale(${bubbleP})`,
								opacity: textOpacity,
								borderRadius: '50%',
								background: COLORS.white,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
							}}
						>
							<IconByName name={n.icon} size={48} stroke="#1a1a1a" />
						</div>
						<div
							style={{
								position: 'absolute',
								top: pos.y - 30,
								left: onRight ? pos.x + NODE_R + 26 : undefined,
								right: onRight ? undefined : WIDTH - (pos.x - NODE_R - 26),
								width: 280,
								textAlign: onRight ? 'left' : 'right',
								opacity: labelOpacity * textOpacity,
							}}
						>
							<div
								style={{
									fontFamily: 'Poppins, sans-serif',
									fontWeight: 600,
									fontSize: 20,
									color: COLORS.white,
								}}
							>
								{n.title}
							</div>
							<div
								style={{
									fontFamily: 'Poppins, sans-serif',
									fontWeight: 300,
									fontSize: 14,
									lineHeight: 1.4,
									color: 'rgba(255,255,255,0.6)',
									marginTop: 4,
								}}
							>
								{n.subtitle}
							</div>
						</div>
					</React.Fragment>
				);
			})}
		</AbsoluteFill>
	);
};
