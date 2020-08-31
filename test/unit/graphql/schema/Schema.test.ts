import { expect } from "chai";
import { Schema } from "../../../../src/graphql/schema/Schema";

describe("GraphQL Schema", () => {
    it("Should not be undefined", () => {
        expect(Schema).to.not.equal(undefined);
    })
});
