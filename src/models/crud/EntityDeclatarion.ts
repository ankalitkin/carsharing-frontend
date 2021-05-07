import {AttributeDeclaration} from "@/models/crud/AttributeDeclaration";
import {ReferenceDeclaration} from "@/models/crud/ReferenceDeclaration";

export interface EntityDeclaration {
    name: string;
    displayName: string;
    attributes: (AttributeDeclaration | ReferenceDeclaration)[];
    readOnly?: boolean;
}
