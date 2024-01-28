import { RootLayout } from "./layout";
import { Clock } from "../components/clock";
import { useClock } from "../hooks/use-time";

export const HomePage = () => {
	useClock();

	return (
		<RootLayout>
			<Clock className="flex-1" type="hour" />

			<Clock
				className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[35rem] rounded-full"
				type="minute"
			/>

			<Clock
				className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[17.5rem] rounded-full"
				type="second"
			/>
		</RootLayout>
	);
};
