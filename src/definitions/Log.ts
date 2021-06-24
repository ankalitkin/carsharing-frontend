import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {AttributeType} from "@/models/crud/AttributeType";
import {Customer} from "@/definitions/Customer";
import {Car} from "@/definitions/Car";

export const Log: EntityDeclaration = {
    name: "log",
    displayName: "Журнал",
    attributes: [
        {
            name: "id",
            displayName: "Id",
            type: AttributeType.Integer
        },
        {
            name: "type",
            displayName: "Тип",
            type: AttributeType.Text
        },
        {
            name: "customerId",
            reference: Customer
        },
        {
            name: "carId",
            reference: Car
        },
        {
            name: "value",
            displayName: "Значение",
            type: AttributeType.Text
        },
        {
            name: "timestamp",
            displayName: "Дата и время",
            type: AttributeType.Text,
        }
    ]
};
