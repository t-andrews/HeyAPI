import { JSONSchema } from "objection";

export class ModelFieldValidator {
    static validateUpdateItem(item: any, jsonSchema: JSONSchema): boolean {
        return jsonSchema.required!.some(
            field => Object.keys(item).some(
                key => field === key
            )
        );
    }
}
