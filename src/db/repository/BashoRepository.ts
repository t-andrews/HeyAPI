import { Service } from "typedi";
import { BashoModel } from "../model/BashoModel";
import { AbstractRepository } from "./AbstractRepository";
import { Basho } from "../../graphql/entity/object/Basho";
import { BashoRowMapper } from "../mapper/row/BashoRowMapper";
import { BashoModelMapper } from "../mapper/model/BashoModelMapper";
import { BashoModelValidator } from "../mapper/model/validator/BashoModelValidator";
import { EmptyUpdateException } from "../../graphql/entity/object/exception/db/EmptyUpdateException";

@Service()
export class BashoRepository extends AbstractRepository<Basho> {

    constructor(
        private bashoModelValidator: BashoModelValidator,
        bashoModelMapper: BashoModelMapper,
        bashoRowMapper: BashoRowMapper
    ) {
        super("bashos", bashoRowMapper, bashoModelMapper);
    }

    public async update(id: number, item: Basho): Promise<boolean> {
        const bashoModel: BashoModel = this.modelMapper.map(item);

        if (!this.bashoModelValidator.validate(bashoModel)) {
            throw new EmptyUpdateException();
        }

        const queryResult: number = await this.postgresClient.queryTable(this.table)
            .where({ "id": id })
            .update(bashoModel)
            .returning("id")
            .then(result => result[0]);

        return queryResult > 0;
    }
}
