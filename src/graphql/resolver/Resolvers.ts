import { BoutResolver } from "./BoutResolver";
import { BashoResolver } from "./BashoResolver";
import { BanzukeResolver } from "./BanzukeResolver";
import { ShikonaResolver } from "./ShikonaResolver";
import { RikishiResolver } from "./RikishiResolver";
import { NonEmptyArray } from "type-graphql/dist/interfaces/NonEmptyArray";

export const Resolvers: NonEmptyArray<Function> = [
    RikishiResolver,
    BoutResolver,
    BashoResolver,
    BanzukeResolver,
    ShikonaResolver
];
