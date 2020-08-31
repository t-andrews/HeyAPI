import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Bout } from "../../../../../src/graphql/entity/object/Bout";
import { BashoRowMapper } from "../../../../../src/db/mapper/row/BashoRowMapper";
import { BashoRowValidator } from "../../../../../src/db/mapper/row/validator/BashoRowValidator";
import { Basho } from "../../../../../src/graphql/entity/object/Basho";
import { HonBasho } from "../../../../../src/constant/HonBasho";

let sandbox: sinon.SinonSandbox;

let bashoRowValidator: BashoRowValidator;
let bashoRowMapper: BashoRowMapper;

chai.use(sinonChai);

describe("Basho Row Mapper", () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        bashoRowValidator = new BashoRowValidator();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios", () => {

        const validRow = {
            id: 111,
            winner_id: 123,
            start_date: new Date("2020-01-04 01:10:25"),
            end_date: new Date("2020-01-04 01:10:25"),
            basho_location: "location_test",
            basho_name: HonBasho.AKI
        };

        const createdBasho: Basho = {
            bouts: undefined!,
            location: validRow.basho_location,
            name: validRow.basho_name,
            startDate: validRow.start_date,
            endDate: validRow.end_date,
            winnerId: validRow.winner_id,
            winner: undefined!,
            id: validRow.id
        };

        it("Should return a Heya for a valid row using heya_id", () => {
            bashoRowMapper = new BashoRowMapper(bashoRowValidator);

            expect(bashoRowMapper.map(validRow)).to.deep.equal(createdBasho);
        });
    });

    describe("Negative scenarios", () => {

        it("Should return undefined for an invalid row", () => {
            bashoRowMapper = new BashoRowMapper(bashoRowValidator);

            expect(bashoRowMapper.map(undefined)).to.equal(undefined);
        });
    });
});
