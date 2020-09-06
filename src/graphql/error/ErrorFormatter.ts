import { GraphQLError } from "graphql";
import { ValidationError } from "class-validator";
import { InputValidationError } from "./InputValidationError";

export class ErrorFormatter {
    public static format(err: GraphQLError): Error {
        let newError: Error = err;

        if (err.originalError) {
            newError = ErrorFormatter.formatSpecialError(err);
        }

        return newError;
    }

    private static formatSpecialError(err: GraphQLError): Error {

        let newError: Error = err;

        if (err.originalError!.message == "Argument Validation Error") {
            const constraints: string[] = err.extensions!.exception.validationErrors.map(
                (e: ValidationError) => Object.values(e.constraints!)[0]
            );

            newError = new InputValidationError(constraints);
        }

        if (err.originalError!.message.startsWith("Query Error: ")) {
            newError = err.originalError!;
        }

        return newError;
    }
}
