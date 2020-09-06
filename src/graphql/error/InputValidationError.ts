import { GraphQLError } from "graphql";

export class InputValidationError extends GraphQLError {
    private readonly _constraints: string[]

    public get constraints(): string[] {
        return this._constraints;
    }

    constructor(constraints: string[]) {
        super(
            "Argument Validation Error",
            undefined, undefined, undefined, undefined, undefined,
            constraints
        );
        this._constraints = constraints;
    }
}
