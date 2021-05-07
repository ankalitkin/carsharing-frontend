import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {AttributeType} from "@/models/crud/AttributeType";

export const Car: EntityDeclaration = {
    name: "car",
    displayName: "Машина",
    attributes: [
        {
            name: "id",
            displayName: "Id",
            type: AttributeType.Integer
        },
        {
            name: "model",
            displayName: "Модель",
            type: AttributeType.Text
        },
        {
            name: "vin",
            displayName: "VIN",
            type: AttributeType.Text
        },
        {
            name: "latitude",
            displayName: "Широта",
            type: AttributeType.Real
        },
        {
            name: "longitude",
            displayName: "Долгота",
            type: AttributeType.Real
        },
        {
            name: "used",
            displayName: "Используется ли",
            type: AttributeType.Boolean
        },
        {
            name: "visible",
            displayName: "Видна ли",
            type: AttributeType.Boolean
        },
        {
            name: "comment",
            displayName: "Комментарий",
            type: AttributeType.Text
        }
    ]
};
