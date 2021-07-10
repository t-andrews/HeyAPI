import { Service } from "typedi";
import { FieldNode } from "graphql";
import { Repository } from "./Repository";
import { Rikishi } from "../../model/Rikishi";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { PartialModelObject, QueryBuilder, raw } from "objection";
import { GenericCRUDRepositoryUtil } from "../../util/GenericCRUDRepositoryUtil";
import { Shikona } from "../../model/Shikona";

@Service()
export class RikishiRepository implements Repository<Rikishi> {

    constructor(private repositoryUtil: GenericCRUDRepositoryUtil) {}

    public async create(item: PartialModelObject<Rikishi>, shikona: string = ""): Promise<Rikishi> {
        return Rikishi.transaction(async trx => {
            const createdRikishi: Rikishi = await Rikishi.query(trx).insert({ birthDate: item.birthDate, shusshin: item.shusshin }).returning("*").catch(err => {
                console.log(err);
                return null!;
            });

            if (!createdRikishi.shikonas) {
                createdRikishi.shikonas = []
            }
            if (!createdRikishi.bouts) {
                createdRikishi.bouts = []
            }
            if (!createdRikishi.banzukes) {
                createdRikishi.banzukes = []
            }

            if (shikona != "") {
                const createdShikona: Shikona = await Shikona.query(trx).insert({ rikishiId: createdRikishi.id, shikona: shikona }).returning("*");
                createdRikishi.shikonas.push(createdShikona);
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

    public async findDetailed(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Rikishi> {
        const queryBuilder: QueryBuilder<Rikishi, Rikishi> = Rikishi.query().findById(id);
        const relationsToFetch: string[] = [];
        const createBouts: boolean = GraphQLNodeUtil.doesSelectionFieldExist(
            fieldNodes, "bouts"
        );

        if (GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, "shikonas")) {
            relationsToFetch.push("shikonas");
        }

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

    public async findDetailedByShikona(shikona: string, fieldNodes: ReadonlyArray<FieldNode>): Promise<Rikishi[]> {
        const lowerShikona: string = shikona.toLowerCase();
        const shikonas: Shikona[] = (
            await Shikona.query()
                .where(raw('lower(shikona)'), 'like', `%${lowerShikona}%`)
                .orderByRaw(`SIMILARITY(shikona, '${lowerShikona}') desc`)
        ) ?? [];
        return Promise.all(shikonas.map(async (s: Shikona): Promise<Rikishi> => {
            return this.findDetailed(s.rikishiId, fieldNodes);
        }));
    }
}
