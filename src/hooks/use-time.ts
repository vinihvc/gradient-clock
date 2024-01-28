import { useAtom } from "jotai/react";
import { timeAtom } from "../store/time";
import { useInterval } from "./use-interval";

export const useClock = () => {
	const [, setTime] = useAtom(timeAtom);

	useInterval(() => {
		const now = new Date();
		setTime({
			hour: now.getHours() % 12 || 12,
			minute: now.getMinutes(),
			second: now.getSeconds(),
		});
	}, 1000);
};
