import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {AttributeType} from "@/models/crud/AttributeType";

export const Customer: EntityDeclaration = {
    name: "customer",
    displayName: "Клиент",
    attributes: [
        {
            name: "id",
            displayName: "Id",
            type: AttributeType.Integer
        },
        {
            name: "name",
            displayName: "Имя",
            type: AttributeType.Text
        },
        {
            name: "phoneNumber",
            displayName: "Номер телефона",
            type: AttributeType.Text
        },
        {
            name: "selfieFilename",
            displayName: "Файл селфи",
            type: AttributeType.Text
        },
        {
            name: "profileConfirmed",
            displayName: "Подтверждён ли",
            type: AttributeType.Boolean
        },
        {
            name: "bannedUntil",
            displayName: "Забанен до",
            type: AttributeType.Date
        }
    ]
};
