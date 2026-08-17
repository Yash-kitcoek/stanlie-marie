import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS, T, WIDTH, HEIGHT} from '../constants';
import {easeInOutCubic} from '../utils';

type P = {x: number; y: number; r: number};

// Fixed "random" layout (deterministic so renders are reproducible)
const PARTICLES: P[] = [
	{x: 0.28, y: 0.16, r: 4},
	{x: 0.36, y: 0.36, r: 3},
	{x: 0.5, y: 0.12, r: 3},
	{x: 0.62, y: 0.22, r: 5},
	{x: 0.7, y: 0.38, r: 3},
	{x: 0.58, y: 0.5, r: 6},
	{x: 0.42, y: 0.58, r: 3},
	{x: 0.3, y: 0.66, r: 5},
	{x: 0.66, y: 0.66, r: 4},
	{x: 0.5, y: 0.74, r: 3},
	{x: 0.2, y: 0.5, r: 3},
	{x: 0.76, y: 0.52, r: 3},
];

const LINKS: [number, number][] = [
	[0, 1],
	[1, 2],
	[2, 3],
	[3, 4],
	[4, 5],
	[5, 6],
	[6, 7],
	[5, 8],
	[8, 9],
	[6, 10],
	[4, 11],
];

export const ParticleField: React.FC = () => {
	const frame = useCurrentFrame();

	if (frame < T.particlesIn - 10 || frame > T.burstPoint + 4) return null;

	const cx = WIDTH * 0.5;
	const cy = HEIGHT * 0.5;

	const appear = interpolate(frame, [T.particlesIn - 10, T.particlesIn + 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const convergeRaw = interpolate(
		frame,
		[T.particlesIn + 20, T.particlesConverge],
		[0, 1],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);
	const converge = easeInOutCubic(convergeRaw);

	const finalFade = interpolate(
		frame,
		[T.particlesConverge - 6, T.burstPoint],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const positions = PARTICLES.map((p) => {
		const px = p.x * WIDTH;
		const py = p.y * HEIGHT;
		const x = px + (cx - px) * converge;
		const y = py + (cy - py) * converge;
		return {x, y, r: p.r * (1 - converge * 0.5)};
	});

	const opacity = appear * finalFade;

	return (
		<AbsoluteFill>
			<svg width={WIDTH} height={HEIGHT} style={{position: 'absolute', inset: 0}}>
				<g opacity={opacity}>
					{LINKS.map(([a, b], i) => {
						const pa = positions[a];
						const pb = positions[b];
						const mx = (pa.x + pb.x) / 2 + (pa.y - pb.y) * 0.08;
						const my = (pa.y + pb.y) / 2 + (pb.x - pa.x) * 0.08;
						return (
							<path
								key={i}
								d={`M ${pa.x} ${pa.y} Q ${mx} ${my} ${pb.x} ${pb.y}`}
								stroke={COLORS.lineSoft}
								strokeWidth={1.4}
								fill="none"
							/>
						);
					})}
					{positions.map((pt, i) => (
						<circle
							key={i}
							cx={pt.x}
							cy={pt.y}
							r={Math.max(pt.r, 1.4)}
							fill={COLORS.white}
						/>
					))}
				</g>
			</svg>
		</AbsoluteFill>
	);
};
