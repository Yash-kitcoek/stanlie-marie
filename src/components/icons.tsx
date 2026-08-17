import React from 'react';

type IconProps = {
	size?: number;
	stroke?: string;
};

const common = {
	fill: 'none',
	strokeWidth: 3.2,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
};

export const ChartIcon: React.FC<IconProps> = ({size = 44, stroke = '#141414'}) => (
	<svg width={size} height={size} viewBox="0 0 48 48">
		<g {...common} stroke={stroke}>
			<line x1="10" y1="34" x2="10" y2="20" />
			<line x1="18" y1="34" x2="18" y2="14" />
			<line x1="26" y1="34" x2="26" y2="24" />
			<circle cx="32" cy="16" r="9" />
			<line x1="38.5" y1="22.5" x2="44" y2="28" />
		</g>
	</svg>
);

export const PeopleIcon: React.FC<IconProps> = ({size = 44, stroke = '#141414'}) => (
	<svg width={size} height={size} viewBox="0 0 48 48">
		<g {...common} stroke={stroke}>
			<circle cx="18" cy="16" r="6" />
			<path d="M6 38c0-7 5.5-11 12-11s12 4 12 11" />
			<circle cx="34" cy="19" r="5" />
			<path d="M30 38c0.5-5.5 4-9 9-9" />
		</g>
	</svg>
);

export const BoxesIcon: React.FC<IconProps> = ({size = 44, stroke = '#141414'}) => (
	<svg width={size} height={size} viewBox="0 0 48 48">
		<g {...common} stroke={stroke}>
			<path d="M24 6 L40 14 V32 L24 40 L8 32 V14 Z" />
			<path d="M8 14 L24 22 L40 14" />
			<line x1="24" y1="22" x2="24" y2="40" />
		</g>
	</svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({size = 44, stroke = '#141414'}) => (
	<svg width={size} height={size} viewBox="0 0 48 48">
		<g {...common} stroke={stroke}>
			<rect x="11" y="8" width="20" height="28" rx="2" />
			<rect x="16" y="5" width="10" height="6" rx="1.5" />
			<line x1="15" y1="18" x2="24" y2="18" />
			<line x1="15" y1="24" x2="21" y2="24" />
			<circle cx="30" cy="30" r="7" />
			<line x1="35" y1="35" x2="39.5" y2="39.5" />
		</g>
	</svg>
);

export const WarningIcon: React.FC<IconProps> = ({size = 44, stroke = '#141414'}) => (
	<svg width={size} height={size} viewBox="0 0 48 48">
		<g {...common} stroke={stroke}>
			<path d="M24 8 L44 40 H4 Z" strokeLinejoin="round" />
			<line x1="24" y1="20" x2="24" y2="29" />
			<circle cx="24" cy="34" r="0.6" fill={stroke} />
		</g>
	</svg>
);

export const IconByName: React.FC<{name: string; size?: number; stroke?: string}> = ({
	name,
	size,
	stroke,
}) => {
	switch (name) {
		case 'chart':
			return <ChartIcon size={size} stroke={stroke} />;
		case 'people':
			return <PeopleIcon size={size} stroke={stroke} />;
		case 'boxes':
			return <BoxesIcon size={size} stroke={stroke} />;
		case 'clipboard':
			return <ClipboardIcon size={size} stroke={stroke} />;
		case 'warning':
			return <WarningIcon size={size} stroke={stroke} />;
		default:
			return null;
	}
};
