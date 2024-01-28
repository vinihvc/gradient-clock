import React from "react";
import { cn } from "../utils/cn";
import Wheel from "@uiw/react-color-wheel";

import { VariantProps, tv } from "tailwind-variants";
import { useOutsideClick } from "../hooks/use-click-outside";

const colorWheelVariants = tv({
	base: ["size-5 border border-neutral-500/50 rounded-full transition z-20"],
	variants: {
		isActive: {
			true: ["border-neutral-500"],
		},
	},
});

interface ColorWheelProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
		VariantProps<typeof colorWheelVariants> {
	/**
	 * Color of the box
	 */
	color?: `#${string}`;
	/**
	 * Callback function when color is changed
	 */
	onChange: (color: string) => void;
}

export const ColorWheel = (props: ColorWheelProps) => {
	const { isActive, color, className, onChange, ...rest } = props;

	const $trigger = React.useRef<HTMLButtonElement>(null);
	const $wheel = React.useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = React.useState(false);

	useOutsideClick([$trigger, $wheel], () => {
		setIsOpen(false);
	});

	return (
		<>
			<button
				ref={$trigger}
				className={cn(
					"color-wheel",
					colorWheelVariants({ className, isActive: isOpen }),
				)}
				style={{ background: color }}
				onClick={() => setIsOpen(!isOpen)}
				{...rest}
			/>

			{isOpen && (
				<>
					<div
						className="fixed inset-0 bg-black/5 backdrop-blur-sm z-[1]"
						onClick={() => setIsOpen(false)}
					/>

					<div
						ref={$wheel}
						className="absolute top-2 right-10 outline-none animate-in fade-in-50 slide-in-from-right-5 z-50"
					>
						<Wheel
							className="border border-neutral-500 rounded-full outline-none cursor-pointer"
							color={color}
							onChange={(e) => onChange(e.hex)}
						/>
					</div>
				</>
			)}
		</>
	);
};
