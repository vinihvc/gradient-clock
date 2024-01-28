import { useMotionValue } from "framer-motion";

import { VariantProps, tv } from "tailwind-variants";
import { cn } from "../utils/cn";
import { motion, useMotionTemplate } from "framer-motion";
import { useAtom } from "jotai";
import { Clocks, clockAtom } from "../store/clock";
import { colorAtom } from "../store/color";
import { timeAtom } from "../store/time";
import React from "react";

const clockVariants = tv({
	base: ["size-full cursor-auto"],
	variants: {
		isSelected: {
			true: [
				"ring-2 ring-offset-2 ring-offset-black/40 ring-white/50 ring-inset",
			],
		},
	},
});

interface ClockProps
	extends Omit<React.ComponentProps<typeof motion.button>, "type">,
		VariantProps<typeof clockVariants> {
	/**
	 * Clock type, hour, minute or second
	 *
	 * @default "hour"
	 */
	type: Clocks;
}

export const Clock = (props: ClockProps) => {
	const { isSelected, type, className, onFocus, ...rest } = props;

	const currentTime = useMotionValue(0);

	const [time] = useAtom(timeAtom);
	const [clock, setCurrentClock] = useAtom(clockAtom);
	const [colors] = useAtom(colorAtom);

	React.useEffect(() => {
		currentTime.set((time[type] / 60) * 360);
	}, [time]);

	return (
		<motion.button
			type="button"
			className={cn(
				"clock",
				clockVariants({
					className,
					isSelected: clock === type,
				}),
			)}
			style={{
				background: useMotionTemplate`conic-gradient(from ${currentTime}deg, ${colors[type].from}, ${colors[type].to})`,
			}}
			{...rest}
			onClick={() => setCurrentClock(type)}
		/>
	);
};
