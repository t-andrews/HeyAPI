import { RikishiResolver } from "./RikishiResolver";
import { NonEmptyArray } from "type-graphql/dist/interfaces/NonEmptyArray";
import { BoutResolver } from "./BoutResolver";
import { BashoResolver } from "./BashoResolver";

export const Resolvers: NonEmptyArray<Function> = [
    RikishiResolver,
    BoutResolver,
    BashoResolver
];
