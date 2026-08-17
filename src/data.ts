export type NodeData = {
	icon: 'chart' | 'people' | 'boxes' | 'clipboard' | 'warning';
	title: string;
	subtitle: string;
	// angle in degrees, measured clockwise from 12 o'clock, and a distance
	// multiplier relative to the base orbit radius
	angle: number;
	dist: number;
};

export type CopilotData = {
	name: string;
	tagline: string;
	caption: string;
	nodes: NodeData[];
};

export const STANLEY: CopilotData = {
	name: 'Stanley',
	tagline: 'operations co-pilot',
	caption:
		'He forecasts test volumes, aligns staffing, and predicts inventory needs so you stay ahead of demand and cut waste before it starts.',
	nodes: [
		{
			icon: 'chart',
			title: 'Test Volume Forecasting',
			subtitle: 'Predicts incoming workload trends to help plan ahead.',
			angle: 57,
			dist: 1,
		},
		{
			icon: 'people',
			title: 'Staffing Alignment',
			subtitle: 'Matches workforce levels with predicted demand.',
			angle: 137,
			dist: 1,
		},
		{
			icon: 'boxes',
			title: 'Inventory Optimization',
			subtitle: 'Forecasts reagent and supply needs to prevent stockouts or waste.',
			angle: 285,
			dist: 1,
		},
	],
};

export const MARIE: CopilotData = {
	name: 'Marie',
	tagline: 'quality co-pilot',
	caption:
		'She monitors QC data and patient results in real time, spotting subtle drifts that lead to compliance issues, safeguarding accuracy, every result, every time.',
	nodes: [
		{
			icon: 'chart',
			title: 'Real-time QC Monitoring',
			subtitle: 'Applies Westgard and Six Sigma logic to track performance continuously.',
			angle: 57,
			dist: 1,
		},
		{
			icon: 'clipboard',
			title: 'Real-time Patient QC',
			subtitle: 'Evaluates patient results to detect shifts early.',
			angle: 285,
			dist: 1,
		},
		{
			icon: 'warning',
			title: 'Proactive Issue Flagging',
			subtitle: 'Identifies potential problems before patients are affected.',
			angle: 137,
			dist: 1,
		},
	],
};
