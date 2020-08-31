import { Service } from "typedi";
import { QueryBuilder } from "knex";
import { FieldNode } from "graphql";
import { AbstractRepository } from "./AbstractRepository";
import { GraphQLNodeUtil } from "../../util/GraphQLNodeUtil";
import { RikishiRowMapper } from "../mapper/row/RikishiRowMapper";
import { Rikishi } from "../../graphql/entity/object/rikishi/Rikishi";
import { RikishiModelMapper } from "../mapper/model/RikishiModelMapper";

@Service()
export class RikishiRepository extends AbstractRepository<Rikishi> {

    constructor(
        private rankModelMapper: RikishiModelMapper,
        private rikishiRowMapper: RikishiRowMapper
    ) {
        super("ranks", rikishiRowMapper, rankModelMapper);
    }

    async findDetailled(id: number, fieldNodes: ReadonlyArray<FieldNode>): Promise<Rikishi> {
        const queryBuilder: QueryBuilder = this.postgresClient.queryTable("rikishis")
            .where({ "rikishis.id": id });

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "rank")) {
            queryBuilder.leftJoin("ranks", "ranks.id", "rikishis.rank_id");
        }

        if(GraphQLNodeUtil.doesSelectionFieldExist(fieldNodes, fieldNodes[0].name.value, "heya")) {
            queryBuilder.leftJoin("heyas", "heyas.id", "rikishis.heya_id");
        }

        const queryResult = await queryBuilder.then(result => result[0]);

        return this.rikishiRowMapper.map(queryResult)
    }

    async update(id: number, item: Rikishi): Promise<boolean> {
        return undefined!;
    }

}
