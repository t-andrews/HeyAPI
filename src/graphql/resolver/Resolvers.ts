import { HeyaResolver } from "./HeyaResolver";
import { BoutResolver } from "./BoutResolver";
import { BashoResolver } from "./BashoResolver";
import { RikishiResolver } from "./RikishiResolver";
import { NonEmptyArray } from "type-graphql/dist/interfaces/NonEmptyArray";
import { BanzukeResolver } from "./BanzukeResolver";

export const Resolvers: NonEmptyArray<Function> = [
    RikishiResolver,
    BoutResolver,
    BashoResolver,
    HeyaResolver,
    BanzukeResolver
];
