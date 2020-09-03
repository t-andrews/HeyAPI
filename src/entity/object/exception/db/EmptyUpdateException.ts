import { DatabaseException } from "./DatabaseException";

export class EmptyUpdateException extends DatabaseException {
    constructor() {
        super("Update data is empty. At least one property must be non-null.");
    }
}
