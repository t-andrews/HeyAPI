import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { HeyaRowMapper } from "../../../../../src/db/mapper/row/HeyaRowMapper";
import { RankRowMapper } from "../../../../../src/db/mapper/row/RankRowMapper";
import { Rikishi } from "../../../../../src/graphql/entity/object/rikishi/Rikishi";
import { RikishiRowMapper } from "../../../../../src/db/mapper/row/RikishiRowMapper";
import { RankRowValidator } from "../../../../../src/db/mapper/row/validator/RankRowValidator";
import { HeyaRowValidator } from "../../../../../src/db/mapper/row/validator/HeyaRowValidator";
import { RikishiRowValidator } from "../../../../../src/db/mapper/row/validator/RikishiRowValidator";

let sandbox: sinon.SinonSandbox;

let rankRowValidator: RankRowValidator;
let heyaRowValidator: HeyaRowValidator;
let rikishiRowValidator: RikishiRowValidator;
let heyaRowMapper: HeyaRowMapper;
let rankRowMapper: RankRowMapper;
let rikishiRowMapper: RikishiRowMapper;

chai.use(sinonChai);

describe("Rikishi Row Mapper", () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        rikishiRowValidator = new RikishiRowValidator();
        heyaRowValidator = new HeyaRowValidator();
        rankRowValidator = new RankRowValidator();
        sandbox.stub(rankRowValidator, "validate").returns(false);
        heyaRowMapper = new HeyaRowMapper(heyaRowValidator);
        rankRowMapper = new RankRowMapper(rankRowValidator);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios", () => {

        const validRow = {
            id: 111,
            heya_id: 123,
            rank_id: 456,
            rikishi_name: "test_name",
            birth_date: new Date("2020-01-04 01:10:25")
        };

        const createdRikishi: Rikishi = {
            birthDate: validRow.birth_date,
            bouts: undefined!,
            heya: undefined!,
            heyaId: validRow.heya_id,
            id: validRow.id,
            name: validRow.rikishi_name,
            rank: undefined!,
            rankId: validRow.rank_id
        };

        it("Should return a Rikishi for a valid row", () => {
            rikishiRowMapper = new RikishiRowMapper(heyaRowMapper, rankRowMapper, rikishiRowValidator);

            expect(rikishiRowMapper.map(validRow)).to.deep.equal(createdRikishi);
        });
    });

    describe("Negative scenarios", () => {

        it("Should return undefined for an invalid row", () => {
            rikishiRowMapper = new RikishiRowMapper(heyaRowMapper, rankRowMapper, rikishiRowValidator);

            expect(rikishiRowMapper.map(undefined)).to.equal(undefined);
        });
    });
});
