export abstract class RowValidator<T> {

    protected keys: string[];

    protected constructor(keys: string[]) {
        this.keys = keys;
    }

    validate(row: any): boolean {
        if (!row) {
            return false;
        } else {
            let valid: boolean = true;
            this.keys.forEach((key: string) => {
                if (!row.hasOwnProperty(key) || !row[key]) {
                    valid = false
                }
            })
            return valid;
        }
    }
}
