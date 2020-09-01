export abstract class RowValidator<T> {

    private keys: string[];

    protected constructor(keys: string[]) {
        this.keys = keys;
    }

    public validate(row: any): boolean {
        return row === undefined ? false : this.areAllKeysValid(row);
    }

    private areAllKeysValid(row: any): boolean {
        return !this.keys.some(
            (key: string) => !row.hasOwnProperty(key) || row[key] === undefined
        );
    }
}
