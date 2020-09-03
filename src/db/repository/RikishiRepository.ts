import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";

@Service()
export class RikishiRepository implements Repository<Rikishi> {

    public async create(item: PartialModelObject<Rikishi>): Promise<number> {
        return await Rikishi.query().insert(item).then(result => result.id);
    }

    public async find(id: number): Promise<Rikishi> {
        return await Rikishi.query()
            .findById(id)
            .then(result => result);
    }

    public update(id: number, item: PartialModelObject<Rikishi>): Promise<boolean> {
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
            fieldNodes, fieldNodes[0].name.value, "bouts"
        );

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "rank")) {
            relationsToFetch.push("rank");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "heya")) {
            relationsToFetch.push("heya");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "wins") || createBouts) {
            relationsToFetch.push("wins");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "losses") || createBouts) {
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
