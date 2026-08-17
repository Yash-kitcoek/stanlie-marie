import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS} from '../constants';

export const Background: React.FC = () => {
	const frame = useCurrentFrame();
	// Very slow subtle breathing of the glow to keep the frame alive.
	const pulse = 1 + Math.sin(frame / 90) * 0.04;

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bgDeep}}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(1400px 1000px at 46% 45%, ${COLORS.bgTop} 0%, ${COLORS.bgDeep} 60%)`,
				}}
			/>
			<AbsoluteFill
				style={{
					transform: `scale(${pulse})`,
					background: `radial-gradient(closest-side, ${COLORS.glowSoft} 0%, rgba(245,137,60,0.28) 28%, rgba(245,137,60,0.08) 52%, rgba(0,0,0,0) 72%)`,
					left: '-32%',
					top: '48%',
					width: '95%',
					height: '95%',
					filter: 'blur(2px)',
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(1600px 1000px at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
				}}
			/>
		</AbsoluteFill>
	);
};
