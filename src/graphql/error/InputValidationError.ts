import { GraphQLError } from "graphql";

export class InputValidationError extends GraphQLError {

    public static readonly baseMessage = "Argument Validation Error"

    private readonly _constraints: string[]

    public get constraints(): string[] {
        return this._constraints;
    }

    constructor(constraints: string[]) {
        super(
            InputValidationError.baseMessage,
            undefined, undefined, undefined, undefined, undefined,
            constraints
        );
        this._constraints = constraints;
    }
}
