import {AttributeType} from "@/models/crud/AttributeType";

export interface AttributeDeclaration {
    name: string;
    displayName: string;
    type: AttributeType;
}
