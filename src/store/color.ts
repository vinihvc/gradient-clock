import { atomWithStorage } from "jotai/utils";

export type Color = {
	hour: {
		from: `#${string}`;
		to: `#${string}`;
	};
	minute: {
		from: `#${string}`;
		to: `#${string}`;
	};
	second: {
		from: `#${string}`;
		to: `#${string}`;
	};
};

export const colorAtom = atomWithStorage<Color>("color", {
	hour: {
		from: "#AAC4BF",
		to: "#76B77F",
	},
	minute: {
		from: "#BD95F1",
		to: "#8529B5",
	},
	second: {
		from: "#F3B13F",
		to: "#ED752F",
	},
});
