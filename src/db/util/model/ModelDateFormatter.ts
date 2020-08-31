export class ModelDateFormatter {
    public static format(date: Date): string {
        if (!date) {
            return undefined!;
        }
        return date.toISOString();
    }
}
