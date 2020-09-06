import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { HeyaRepository } from "./HeyaRepository";
import { QueryError } from "../../graphql/error/QueryError";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder } from "objection";
import { Rikishi } from "../../entity/object/rikishi/Rikishi";

@Service()
export class RikishiRepository implements Repository<Rikishi> {

    constructor(
        private heyaRepository: HeyaRepository
    ) {}

    public async create(item: PartialModelObject<Rikishi>): Promise<number> {

        if (item.heyaId != undefined ) {
            if (await this.heyaRepository.find(item.heyaId as number) == undefined) {
                throw new QueryError(`No Heya with id "${item.heyaId}" was found`)
            }
        }

        const newRikishi: Rikishi = await Rikishi.transaction(async trx => {
            const createdRikishi: Rikishi = await Rikishi.query(trx).insert(item);

            if(item.ranks != undefined) {
                await createdRikishi.$relatedQuery("ranks", trx).insert(item.ranks);
            }

            return createdRikishi;
        });

        return newRikishi.id;
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
            rikishi.bouts = [...rikishi.losses, ...rikishi.wins]
        }

        return rikishi;
    }
}
