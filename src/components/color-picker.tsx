import React from "react";
import { cn } from "../utils/cn";

import { tv } from "tailwind-variants";
import { useAtom } from "jotai/react";
import { clockAtom } from "../store/clock";
import { colorAtom } from "../store/color";
import { ColorWheel } from "./color-wheel";

const colorPickerVariants = tv({
	base: [""],
});

interface ColorPickerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ColorPicker = (props: ColorPickerProps) => {
	const { className, ...rest } = props;

	const $ref = React.useRef<HTMLDivElement>(null);

	const [currentClock] = useAtom(clockAtom);
	const [color, setColors] = useAtom(colorAtom);

	const handleColorChange = (c: string, fromTo: "from" | "to") => {
		setColors({
			...color,
			[currentClock]: {
				...color[currentClock],
				[fromTo]: c,
			},
		});
	};

	return (
		<div
			ref={$ref}
			className={cn("color-picker", colorPickerVariants({ className }))}
			{...rest}
		>
			<div className="flex gap-x-2 relative">
				<ColorWheel
					color={color[currentClock].from}
					onChange={(e) => handleColorChange(e, "from")}
				/>

				<ColorWheel
					color={color[currentClock].to}
					onChange={(e) => handleColorChange(e, "to")}
				/>
			</div>
		</div>
	);
};
