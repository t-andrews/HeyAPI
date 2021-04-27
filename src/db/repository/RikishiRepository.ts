import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { Heya } from "../../model/rikishi/Heya";
import { Rikishi } from "../../model/rikishi/Rikishi";
import { QueryError } from "../../graphql/error/QueryError";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";

@Service()
export class RikishiRepository implements Repository<Rikishi> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Rikishi>): Promise<Rikishi> {
        return await Rikishi.transaction(async trx => {
            let heya: Heya = undefined!;
            if (item.heyaId != undefined ) {
                heya = await this.repositoryUtil.find<Heya>(item.heyaId as number, Heya.query(trx));
                if (heya == undefined) {
                    throw new QueryError(`No Heya with id "${item.heyaId}" was found`)
                }
            }

            const createdRikishi: Rikishi = await Rikishi.query(trx).insertGraph(item);
            createdRikishi.heya = heya;

            if (createdRikishi.bouts == undefined) {
                createdRikishi.bouts = []
            }
            if (createdRikishi.banzukes == undefined) {
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
        return await Rikishi.query()
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

        if (GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "heya")) {
            relationsToFetch.push("heya");
        }

        if (createBouts || GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "wins")) {
            relationsToFetch.push("wins");
        }

        if (createBouts || GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "losses")) {
            relationsToFetch.push("losses");
        }

        console.log("JOINED: ", `[${relationsToFetch.join(",")}]`)

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
