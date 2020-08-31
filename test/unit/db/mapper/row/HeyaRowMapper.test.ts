import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Heya } from "../../../../../src/graphql/entity/object/rikishi/Heya";
import { HeyaRowMapper } from "../../../../../src/db/mapper/row/HeyaRowMapper";
import { HeyaRowValidator } from "../../../../../src/db/mapper/row/validator/HeyaRowValidator";

let sandbox: sinon.SinonSandbox;

let heyaRowValidator: HeyaRowValidator;
let heyaRowMapper: HeyaRowMapper;

chai.use(sinonChai);

describe("Heya Row Mapper", () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        heyaRowValidator = new HeyaRowValidator();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios", () => {
        const ID: number = 123;

        const validRow = {
            heya_name: "name_test",
            ichimon: "ichimon_test",
            creation_date: new Date("2020-01-04 01:10:25"),
            heya_location: "location_test",
            heya_id: undefined,
            id: undefined
        };

        const createdHeya: Heya = {
            id: ID,
            name: validRow.heya_name,
            ichimon: validRow.ichimon,
            creationDate: validRow.creation_date,
            location: validRow.heya_location
        };

        it("Should return a Heya for a valid row using heya_id", () => {
            heyaRowMapper = new HeyaRowMapper(heyaRowValidator);

            // @ts-ignore
            validRow.heya_id = ID;

            expect(heyaRowMapper.map(validRow)).to.deep.equal(createdHeya);

            validRow.heya_id = undefined;
        });

        it("Should return a Heya for a valid row using id", () => {
            heyaRowMapper = new HeyaRowMapper(heyaRowValidator);

            // @ts-ignore
            validRow.id = ID;

            expect(heyaRowMapper.map(validRow)).to.deep.equal(createdHeya);

            validRow.id = undefined;
        });
    });

    describe("Negative scenarios", () => {

        it("Should return undefined for an invalid row", () => {
            heyaRowMapper = new HeyaRowMapper(heyaRowValidator);

            expect(heyaRowMapper.map(undefined)).to.equal(undefined);
        });
    });
});
