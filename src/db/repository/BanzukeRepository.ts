import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { Rank } from "../../model/rikishi/Rank";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";
import { Banzuke } from "../../model/Banzuke";

@Service()
export class BanzukeRepository implements Repository<Banzuke> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Banzuke>): Promise<Banzuke> {
        return await this.repositoryUtil.create(item, Banzuke.query());
    }

    public async createWithRank(item: PartialModelObject<Banzuke>, rank: PartialModelObject<Rank>): Promise<Banzuke> {

        const newRank: Rank = await this.repositoryUtil.create<Rank>({...rank, rikishiId: item.rikishiId}, Rank.query());
        item.rankId = newRank.id;
        return await this.repositoryUtil.create(item, Banzuke.query());
    }

    public async find(id: number): Promise<Banzuke> {
        return await this.repositoryUtil.find(id, Banzuke.query());
    }

    public async update(item: Banzuke): Promise<Banzuke> {
        return this.repositoryUtil.update(item, Banzuke.query());
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Banzuke.query());
    }

    public async createMany(rikishiId: number, ranks: PartialModelObject<Banzuke>[]): Promise<Banzuke[]> {
        ranks = ranks.map(r => {
            r.rikishiId = rikishiId;
            return r;
        })
        return Banzuke.query().insert(ranks);
    }

    public async findByRikishiId(id: number): Promise<Banzuke[]> {
        return Banzuke.query()
            .where({ "rikishiId": id });
    }
}
