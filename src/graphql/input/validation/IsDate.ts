import moment from "moment";
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments
} from "class-validator";

export function IsDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any) {
                    if (typeof value === 'string') {
                        return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value) && moment(value, 'YYYY-MM-DD').isValid();
                    }
                    return false;
                },
                defaultMessage(validationArguments?: ValidationArguments): string {
                    return `${validationArguments?.property} must be a valid date (Required format: YYYY-MM-DD)`;
                }
            }
        });
    };
}
