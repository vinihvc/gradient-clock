import React from "react";

import { ColorPicker } from "../components/color-picker";

interface RootLayoutProps {
	children: React.ReactNode;
}

export const RootLayout = (props: RootLayoutProps) => {
	const { children } = props;

	const $ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const el = $ref.current;

		if (!el) return;

		const handleFullScreen = () => {
			const root = document.querySelector("#root");
			root?.requestFullscreen();
		};

		el.addEventListener("dblclick", handleFullScreen);

		return () => {
			el.removeEventListener("dblclick", handleFullScreen);
		};
	}, []);

	return (
		<>
			<ColorPicker className="fixed top-3 right-3 z-50" />

			<main ref={$ref} className="flex flex-col flex-1 min-h-screen">
				{children}
			</main>
		</>
	);
};
