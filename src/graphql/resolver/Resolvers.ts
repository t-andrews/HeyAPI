import { BoutResolver } from "./BoutResolver";
import { BashoResolver } from "./BashoResolver";
import { RikishiResolver } from "./RikishiResolver";
import { NonEmptyArray } from "type-graphql/dist/interfaces/NonEmptyArray";

export const Resolvers: NonEmptyArray<Function> = [
    RikishiResolver,
    BoutResolver,
    BashoResolver
];
