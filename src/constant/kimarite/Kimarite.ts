import { Nagete } from "./Nagete";
import { Kakete } from "./Kakete";
import { Sorite } from "./Sorite";
import { Hiwaza } from "./Hiwaza";
import { Hinerite } from "./Hinerite";
import { Kihonwaza } from "./Kihonwaza";
import { Tokushuwaza } from "./Tokushuwaza";
import { OtherCondition } from "./OtherCondition";

/**
 * All winning methods.
 */
export const Kimarite = {
    ...Kihonwaza,
    ...Nagete,
    ...Kakete,
    ...Hinerite,
    ...Sorite,
    ...Hiwaza,
    ...Tokushuwaza,
    ...OtherCondition
};

export type Kimarite = typeof Kimarite;
