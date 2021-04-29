import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { Rikishi } from "../../model/Rikishi";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class RikishiRepository implements Repository<Rikishi> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Rikishi>): Promise<Rikishi> {
        return Rikishi.transaction(async trx => {
            const createdRikishi: Rikishi = await Rikishi.query(trx).insertGraph(item);

            if (!createdRikishi.bouts) {
                createdRikishi.bouts = []
            }
            if (!createdRikishi.banzukes) {
                createdRikishi.banzukes = []
            }

            return createdRikishi;
        });
    }

    public async find(id: number): Promise<Rikishi> {
        return this.repositoryUtil.find<Rikishi>(id, Rikishi.query());
    }

    public update(item: PartialModelObject<Rikishi>): Promise<Rikishi> {
        return undefined!;
    }

    public async delete(id: number): Promise<boolean> {
        return Rikishi.query()
            .deleteById(id)
            .then(result => {
                return result > 0;
            });
    }

    public async findDetailled(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Rikishi> {
        const queryBuilder: QueryBuilder<Rikishi, Rikishi> = Rikishi.query().findById(id);
        const relationsToFetch: string[] = [];
        const createBouts: boolean = GraphQLNodeUtil.doesSelectionFieldExist(
            fieldNodes, "bouts"
        );

        if (GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "banzukes")) {
            relationsToFetch.push("banzukes");
        }

        if (createBouts || GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "wins")) {
            relationsToFetch.push("wins");
        }

        if (createBouts || GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "losses")) {
            relationsToFetch.push("losses");
        }

        if (relationsToFetch.length > 0) {
            queryBuilder.withGraphJoined(`[${relationsToFetch.join(",")}]`);
        }

        const rikishi: Rikishi = await queryBuilder;

        if (createBouts) {
            rikishi.bouts = [...rikishi.losses!, ...rikishi.wins!]
        }

        return rikishi;
    }
}
