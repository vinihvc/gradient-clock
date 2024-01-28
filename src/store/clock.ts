import { atomWithStorage } from "jotai/utils";

export type Clocks = "hour" | "minute" | "second";

export const clockAtom = atomWithStorage<Clocks>("clock", "hour");
