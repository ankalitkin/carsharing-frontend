import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";

export interface ReferenceDeclaration {
    name: string;
    displayName?: string;
    reference: EntityDeclaration;
}
