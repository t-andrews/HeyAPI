import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { Heya } from "../../entity/object/rikishi/Heya";
import { QueryError } from "../../graphql/error/QueryError";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";
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
            if (createdRikishi.ranks == undefined) {
                createdRikishi.ranks = []
            }

            return createdRikishi
        });
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
        const queryBuilder: QueryBuilder<Rikishi, Rikishi> = Rikishi.query().findById(id);
        const relationsToFetch: string[] = [];
        const createBouts: boolean = GraphQLNodeUtil.doesSelectionFieldExist(
            fieldNodes, "bouts"
        );

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "ranks")) {
            relationsToFetch.push("ranks");
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

        const rikishi: Rikishi = await queryBuilder;

        if (createBouts) {
            rikishi.bouts = [...rikishi.losses!, ...rikishi.wins!]
        }

        return rikishi;
    }
}
