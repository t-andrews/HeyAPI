import { GraphQLError } from "graphql";
import { ValidationError } from "class-validator";
import { InputValidationError } from "./InputValidationError";

export class ErrorFormatter {
    public static format(err: GraphQLError): GraphQLError {
        if (err.originalError && err.originalError.message == "Argument Validation Error") {
            const constraints: string[] = err.extensions!.exception.validationErrors.map(
                (e: ValidationError) => Object.values(e.constraints!)[0]
            );

            return new InputValidationError(constraints);
        }

        return err;
    }
}
