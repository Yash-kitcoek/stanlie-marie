// Canvas -----------------------------------------------------------------
// Source reference was 736x414 (16:9). We render at 2x for crispness.
export const FPS = 25;
// Internal design canvas (all component math uses this space).
export const WIDTH = 1920;
export const HEIGHT = 1080;
// Actual exported video resolution (scaled down for render speed).
export const EXPORT_WIDTH = 1280;
export const EXPORT_HEIGHT = 720;
export const TOTAL_FRAMES = 912; // 36.48s, matches reference exactly

// Palette ------------------------------------------------------------------
export const COLORS = {
	bgTop: '#050a10',
	bgDeep: '#03070c',
	glow: '#f5893c',
	glowSoft: 'rgba(245,137,60,0.55)',
	white: '#ffffff',
	orange: '#e56a1c',
	orangeBright: '#f0812f',
	dim: 'rgba(255,255,255,0.55)',
	dimmer: 'rgba(255,255,255,0.32)',
	line: 'rgba(255,255,255,0.35)',
	lineSoft: 'rgba(255,255,255,0.18)',
	dark: '#141414',
};

// Timeline (in frames, fps=25) ----------------------------------------------
export const T = {
	// Scene A: intro words
	word1In: 0,
	word1Hold: 45,
	word1Out: 62,
	word2In: 62,
	word2Hold: 150,
	introOut: 195,

	// Scene B: particles converge
	particlesIn: 150,
	particlesConverge: 235,
	burstPoint: 245,

	// Scene C+D: frame reveal with typewriter phrases, then fly away
	frameIn: 232,
	phrase1: 250, // "amplify human intelligence"
	phrase2: 306, // "and strengthen every"
	phrase3: 350, // "part of your lab"
	frameTilt: 356,
	frameCollapse: 396,
	dotBorn: 400,

	// Scene E: circle logo reveal (Stanley)
	circleIn: 400,
	nameTypeStart: 420,
	taglineIn: 452,

	// Scene F: Stanley network
	stanleyStart: 400,
	stanleyCaptionStart: 448,
	stanleyNode1: 478,
	stanleyNode2: 508,
	stanleyNode3: 538,
	stanleyHoldEnd: 600,

	// Scene G: morph Stanley -> Marie
	morphStart: 600,
	morphEnd: 636,

	// Scene H: Marie network
	marieStart: 600,
	marieCaptionStart: 650,
	marieNode1: 680,
	marieNode2: 710,
	marieNode3: 740,
	marieHoldEnd: TOTAL_FRAMES,
};
