export class DatabaseException extends Error {

    constructor(message: string) {
        super(`Database exception: ${message}`);
    }
}
