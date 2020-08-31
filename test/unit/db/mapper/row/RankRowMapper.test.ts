import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Division } from "../../../../../src/constant/Division";
import { MakuuchiRank } from "../../../../../src/constant/MakuuchiRank";
import { Rank } from "../../../../../src/graphql/entity/object/rikishi/Rank";
import { RankRowMapper } from "../../../../../src/db/mapper/row/RankRowMapper";
import { RankRowValidator } from "../../../../../src/db/mapper/row/validator/RankRowValidator";

let sandbox: sinon.SinonSandbox;

let rankRowValidator: RankRowValidator;
let rankRowMapper: RankRowMapper;

chai.use(sinonChai);

describe("Rank Row Mapper", () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        rankRowValidator = new RankRowValidator();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios", () => {
        const ID: number = 123;

        const validRow = {
            division: Division.JONIDAN,
            makuuchi_rank: MakuuchiRank.KOMUSUBI,
            position: 5,
            start_date: new Date("2020-01-04 01:10:25"),
            end_date: new Date("2020-01-04 01:10:25"),
            rank_id: undefined,
            id: undefined
        };

        const createdRank: Rank = {
            id: ID,
            division: validRow.division,
            makuuchiRank: validRow.makuuchi_rank,
            position: validRow.position,
            region: undefined,
            startDate: validRow.start_date,
            endDate: validRow.end_date
        };

        it("Should return a Rank for a valid row using rank_id", () => {
            rankRowMapper = new RankRowMapper(rankRowValidator);

            // @ts-ignore
            validRow.rank_id = ID;

            expect(rankRowMapper.map(validRow)).to.deep.equal(createdRank);

            validRow.rank_id = undefined;
        });

        it("Should return a Rank for a valid row using id", () => {
            rankRowMapper = new RankRowMapper(rankRowValidator);

            // @ts-ignore
            validRow.id = ID;

            expect(rankRowMapper.map(validRow)).to.deep.equal(createdRank);

            validRow.id = undefined;
        });
    });

    describe("Negative scenarios", () => {

        it("Should return undefined for an invalid row", () => {
            rankRowMapper = new RankRowMapper(rankRowValidator);

            expect(rankRowMapper.map(undefined)).to.equal(undefined);
        });
    });
});
