export const clamp = (v: number, min: number, max: number) =>
	Math.min(max, Math.max(min, v));

// Returns a substring of `text` progressively revealed between frames
// `start` and `end`, character by character.
export const typeOn = (
	text: string,
	frame: number,
	start: number,
	end: number
): string => {
	if (frame <= start) return '';
	if (frame >= end) return text;
	const progress = (frame - start) / (end - start);
	const chars = Math.round(text.length * progress);
	return text.slice(0, chars);
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
export const easeInOutCubic = (t: number) => {
	const c = clamp(t, 0, 1);
	return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};
