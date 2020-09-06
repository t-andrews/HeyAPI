import { Service } from "typedi";
import { Repository } from "./Repository";
import { PartialModelObject } from "objection";
import { Rank } from "../../entity/object/rikishi/Rank";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class RankRepository implements Repository<Rank> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Rank>): Promise<number> {
        return await this.repositoryUtil.create(item, Rank.query())
    }

    public async find(id: number): Promise<Rank> {
        return await this.repositoryUtil.find(id, Rank.query())
    }

    public async update(item: Rank): Promise<boolean> {
        return this.repositoryUtil.update(item, Rank.query())
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Rank.query())
    }

    public async findByRikishiId(id: number): Promise<Rank[]> {
        return Rank.query()
            .where({ "rikishiId": id })
            .then(result => result);
    }
}
