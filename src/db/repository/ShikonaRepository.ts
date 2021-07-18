import { Service } from "typedi";
import { Repository } from "./Repository";
import { Shikona } from "../../model/entity/Shikona";
import { Model, PartialModelObject } from "objection";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class ShikonaRepository implements Repository<Shikona> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Shikona>): Promise<Shikona> {
        return this.repositoryUtil.create(item, Shikona.query());
    }

    public async find(id: number): Promise<Shikona> {
        return this.repositoryUtil.find(id, Shikona.query());
    }

    public async update(item: Shikona): Promise<Shikona> {
        return this.repositoryUtil.update(item, Shikona.query());
    }

    public async delete(id: number): Promise<boolean> {
        return this.repositoryUtil.delete(id, Shikona.query());
    }

    public async createMany(Shikonas: PartialModelObject<Shikona>[]): Promise<Shikona[]> {
        return Shikona.query().insert(Shikonas);
    }

    public async findByRikishiId(id: number): Promise<Shikona[]> {
        return Shikona.query().where({ "rikishiId": id });
    }

    public async findCurrentShikona(rikishiId: number): Promise<Shikona> {
        return Model.knex().raw<Shikona>(
            "SELECT shikonas.id, shikonas.shikona, bashos.basho " +
            "FROM shikonas, banzuke, bashos " +
            `WHERE shikonas.rikishi_id = ${rikishiId} AND shikonas.id = banzuke.shikona_id AND banzuke.basho_id = bashos.id ` +
            "ORDER BY bashos.basho DESC"
        ).then((response: any): Shikona => {
            return response.rows[0];
        });
    }
}
