import { RowMapper } from "./RowMapper";
import { RowValidator } from "./validator/RowValidator";

export abstract class AbstractRowMapper<T> implements RowMapper<T>{

    protected rowValidator: RowValidator<T>;

    protected constructor(rowValidator: RowValidator<T>) {
        this.rowValidator = rowValidator;
    }

    map(row: any): T {
        return this.rowValidator.validate(row) ? this.doMap(row) : undefined!;
    }

    protected abstract doMap(row: any): T
}
