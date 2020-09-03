import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import chai, { expect } from "chai";
import { Heya } from "../../../../src/entity/object/rikishi/Heya";
import { HeyaRepository } from "../../../../src/db/repository/HeyaRepository";

let sandbox: sinon.SinonSandbox;

chai.use(sinonChai);

let heyaRepository: HeyaRepository;

describe("Heya Repository", async () => {

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        heyaRepository = new HeyaRepository();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Positive scenarios", async () => {

        it("Should return the id on successfull creation", async () => {

            sandbox.stub(Heya, "query").returns(<any> {
                insert: () => ({
                    then: () => 1
                })
            });

            const result: number = await heyaRepository.create({
                creationDate: "2020-01-04 01:10:25+01:00",
                ichimon: "ichimon_test",
                location: "location_test",
                name: "name_test"
            });

            expect(result).to.equal(1);
        });

        it("Should return a Heya on successfull find", async () => {

            const heya: Partial<Heya> = {
                id: 123,
                creationDate: "2020-01-04 01:10:25+01:00",
                ichimon: "ichimon_test",
                location: "location_test",
                name: "name_test"
            }

            sandbox.stub(Heya, "query").returns(<any> {
                findById: () => ({
                    then: () => heya
                })
            });

            const result: Heya = await heyaRepository.find(123);

            expect(result).to.deep.equal(heya);
        });

        it("Should return true on successfull update", async () => {

            sandbox.stub(Heya, "query").returns(<any> {
                findById: () => ({
                    patch: () => ({
                        returning: () => ({
                            then: () => true
                        })
                    })
                })
            });

            const result: boolean = await heyaRepository.update(123, undefined!);

            expect(result).to.deep.equal(true);
        });

        it("Should return true on successfull delete", async () => {

            sandbox.stub(Heya, "query").returns(<any> {
                deleteById: () => ({
                    patch: () => ({
                        then: () => true
                    })
                })
            });

            const result: boolean = await heyaRepository.delete(123);

            expect(result).to.deep.equal(true);
        });
    });
});
