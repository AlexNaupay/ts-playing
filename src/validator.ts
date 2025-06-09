import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    validate, IsISO8601
} from 'class-validator';

import { DateTime } from 'luxon'

@ValidatorConstraint({ name: 'IsCapitalized', async: false })
class IsCapitalizedConstraint implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        return value.charAt(0) === value.charAt(0).toUpperCase();
    }

    defaultMessage(): string {
        return 'First character must be uppercase';
    }
}

export function IsCapitalized(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCapitalizedConstraint,
        });
    };
}

export function IsIntegerString(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any) {
                    return typeof value === 'string' && /^\d+$/.test(value);
                },
                defaultMessage() {
                    return 'Value must be an integer string';
                }
            },
        });
    };
}

export function IsISODateTimeString(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: any) {
                    try {
                        const dt = DateTime.fromISO(value)
                        return dt.isValid
                    }catch (e){
                        return false
                    }
                },
                defaultMessage() {
                    return 'Value must be an ISO datetime string';
                }
            },
        });
    };
}

export class VolcanoDto {
    @IsCapitalized({ message: 'Name must start with a capital letter' })
    name?: string;

    @IsIntegerString({ message: 'Age must be an integer string' })
    age?: string;

    //@IsISODateTimeString()
    @IsISO8601()
    datetime?: String
}

const v = new VolcanoDto()
v.name = 'xAlex'
v.age = '15'
// v.datetime = '2025-05-1212:15:45-05:00'
//v.datetime = '2025-05-12 15:00:16'
v.datetime = '2025-06-04T16:03:18'


validate(v).then(console.log)


