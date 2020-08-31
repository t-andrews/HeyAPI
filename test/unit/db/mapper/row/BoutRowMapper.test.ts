import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Bout } from "../../../../../src/graphql/entity/object/Bout";
import { BoutRowMapper } from "../../../../../src/db/mapper/row/BoutRowMapper";
import { BoutRowValidator } from "../../../../../src/db/mapper/row/validator/BoutRowValidator";
import { Kimarite } from "../../../../../src/constant/Kimarite";

let sandbox: sinon.SinonSandbox;

let boutRowValidator: BoutRowValidator;
let boutRowMapper: BoutRowMapper;

chai.use(sinonChai);

describe("Bout Row Mapper", () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        boutRowValidator = new BoutRowValidator();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios", () => {

        const validRow = {
            id: 111,
            opponent_id_1: 123,
            opponent_id_2: 456,
            winner_id: 123,
            basho_id: 1,
            basho_day: 10,
            date: new Date("2020-01-04 01:10:25"),
            duration: 222,
            order: 6,
            winning_method: Kimarite.DEFAULT
        };

        const createdBout: Bout = {
            id: validRow.id,
            basho: undefined!,
            bashoDay: validRow.basho_day,
            bashoId: validRow.basho_id,
            date: validRow.date,
            duration: validRow.duration,
            opponentId1: validRow.opponent_id_1,
            opponentId2: validRow.opponent_id_2,
            opponents: undefined!,
            order: validRow.order,
            winner: undefined!,
            winnerId: validRow.winner_id,
            winningMethod: validRow.winning_method
        };

        it("Should return a Heya for a valid row using heya_id", () => {
            boutRowMapper = new BoutRowMapper(boutRowValidator);

            expect(boutRowMapper.map(validRow)).to.deep.equal(createdBout);
        });
    });

    describe("Negative scenarios", () => {

        it("Should return undefined for an invalid row", () => {
            boutRowMapper = new BoutRowMapper(boutRowValidator);

            expect(boutRowMapper.map(undefined)).to.equal(undefined);
        });
    });
});
