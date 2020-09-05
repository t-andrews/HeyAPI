import { Service } from "typedi";
import { PartialModelObject } from "objection";
import { Repository } from "./Repository";
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

    public async update(id: number, item: Rank): Promise<boolean> {
        return await this.repositoryUtil.update(id, item, Rank.query())
    }

    public async delete(id: number): Promise<boolean> {
        return await this.repositoryUtil.delete(id, Rank.query())
    }

    public async findByRikishiId(id: number): Promise<Rank[]> {
        return await Rank.query()
            .where({ "rikishiId": id })
            .then(result => result);
    }
}
