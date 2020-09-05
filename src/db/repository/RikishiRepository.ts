import { Service } from "typedi";
import { FieldNode } from "graphql";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { Repository } from "./Repository";
import { PartialModelObject, QueryBuilder } from "objection";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class RikishiRepository implements Repository<Rikishi> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Rikishi>): Promise<number> {
        await Rikishi.transaction(async trx => {

        });

        return 0;
    }

    public async find(id: number): Promise<Rikishi> {
        return await Rikishi.query()
            .findById(id)
            .then(result => result);
    }

    public update(item: PartialModelObject<Rikishi>): Promise<boolean> {
        return undefined!;
    }

    public async delete(id: number): Promise<boolean> {
        return await Rikishi.query()
            .deleteById(id)
            .then(result => {
                return result > 0;
            });
    }

    public async findDetailled(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Rikishi> {
        const queryBuilder: QueryBuilder<Rikishi> = Rikishi.query().where({ "rikishis.id": id });
        const relationsToFetch: string[] = [];
        const createBouts: boolean = GraphQLNodeUtil.doesSelectionFieldExist(
            fieldNodes, "bouts"
        );

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "rank")) {
            relationsToFetch.push("rank");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "heya")) {
            relationsToFetch.push("heya");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "wins") || createBouts) {
            relationsToFetch.push("wins");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "losses") || createBouts) {
            relationsToFetch.push("losses");
        }

        if (relationsToFetch.length > 0) {
            queryBuilder.withGraphJoined(`[${relationsToFetch.join(",")}]`);
        }

        const rikishi: Rikishi = await queryBuilder.then(result => result[0]);

        if (createBouts) {
            rikishi.bouts = [...rikishi.losses, ...rikishi.wins]
        }

        return rikishi;
    }
}
