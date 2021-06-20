import { expect } from "chai";
import { Validator } from "class-validator";
import { IsDate } from "../../../../../src/graphql/input/validation/IsDate";

class ValidatedClass {

    constructor(date: string) {
        this.date = date;
    }

    @IsDate()
    date: string
}

const validator = new Validator();

describe("IsDate decorator", () => {
    it("Should be a valid date", () => {
        expect(validator.validateSync(new ValidatedClass("2020-01-02")).length).to.equal(0, "there should be no validation error");
    })

    it("Should be an invalid date", () => {
        expect(validator.validateSync(new ValidatedClass("2020-01")).length).to.equal(1, "there should be a validation error");
    })

    it("Should have an invalid type (not string)", () => {
        expect(validator.validateSync(new ValidatedClass(<string><unknown>123)).length).to.equal(1, "there should be a validation error");
    })
});
