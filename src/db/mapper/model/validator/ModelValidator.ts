export abstract class ModelValidator<T> {

    private keys: string[];

    protected constructor(keys: string[]) {
        this.keys = keys;
    }

    validate(row: any): boolean {
        if (!row) {
            return false;
        } else {
            let valid: boolean = false;
            this.keys.forEach((key: string) => {
                if (row.hasOwnProperty(key) && row[key] !== undefined) {
                    valid = true
                }
            })
            return valid;
        }
    }
}
