import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {ReferenceDeclaration} from "@/models/crud/ReferenceDeclaration";

export class DeclarationService {
    public static getReferences(entityDeclaration: EntityDeclaration): string[] {
        return entityDeclaration.attributes
            .filter(value => "reference" in value)
            .map(value => (value as ReferenceDeclaration).reference.name);
    }

}
