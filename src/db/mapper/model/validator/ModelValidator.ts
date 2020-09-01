export abstract class ModelValidator<T> {

    private keys: string[];

    protected constructor(keys: string[]) {
        this.keys = keys;
    }

    public validate(row: any): boolean {
        return row === undefined ? false : this.isSomeKeyValid(row);
    }

    private isSomeKeyValid(row: any): boolean {
        return this.keys.some(
            (key: string) => row.hasOwnProperty(key) && row[key] !== undefined
        );
    }
}
