export class ModelDateFormatter {
    static format(date: Date): string {
        if (!date) {
            return undefined!;
        }
        return date.toISOString();
    }
}
