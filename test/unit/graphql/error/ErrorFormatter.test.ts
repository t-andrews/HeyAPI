import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { GraphQLError } from "graphql";
import { InputValidationError } from "../../../../src/graphql/error/InputValidationError";
import { ErrorFormatter } from "../../../../src/graphql/error/ErrorFormatter";

chai.use(sinonChai);

describe("Error Fromatter",  () => {

    describe("Positive scenarios",  () => {
        it("Should return an InputValidationError when the original error is one of validation", async () => {
            const firstContraint: string = "some first constraint";
            const secondContraint: string = "some second constraint";

            const extension = {
                exception: {
                    validationErrors: [
                        {
                            constraints: { "constraint1": firstContraint }
                        },
                        {
                            constraints: { "constraint2": secondContraint }
                        }
                    ]
                }
            };

            const inputError: GraphQLError = new GraphQLError(
                "Argument Validation Error",
                undefined, undefined, undefined, undefined,
                new Error("Argument Validation Error"),
                extension
            );

            const result: GraphQLError = ErrorFormatter.format(inputError);

            expect(result instanceof InputValidationError).to.be.true;
            expect((result as InputValidationError).constraints[0]).to.be.equal(firstContraint);
            expect((result as InputValidationError).constraints[1]).to.be.equal(secondContraint);
        });

        it("Should return a regular GraphQLError when it is not a special case", async () => {

            const inputError: GraphQLError = new GraphQLError(
                "Some Normal Error",
                undefined, undefined, undefined, undefined,
                new Error("Some Normal Error"),
            );

            const result: GraphQLError = ErrorFormatter.format(inputError);

            expect(result).to.deep.equal(inputError);
        });
    });

    describe("Negative scenarios", async () => {

    });
});
