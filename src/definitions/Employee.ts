import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {AttributeType} from "@/models/crud/AttributeType";

export const Employee: EntityDeclaration = {
    name: "employee",
    displayName: "Сотрудник",
    adminOnly: true,
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
            name: "roles",
            displayName: "Роли",
            type: AttributeType.Text
        },
        {
            name: "login",
            displayName: "Логин",
            type: AttributeType.Text
        },
        {
            name: "newPassword",
            displayName: "Задать пароль",
            type: AttributeType.Password
        },
        {
            name: "deleted",
            displayName: "Удалён ли",
            type: AttributeType.Boolean
        }
    ]
};
