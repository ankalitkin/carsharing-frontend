import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {Employee} from "@/definitions/Employee";


export const allDeclarationsList: EntityDeclaration[] = [
    Employee,
]

export const allDeclarationsMap: Record<string, EntityDeclaration> = {}
allDeclarationsList.forEach(d => allDeclarationsMap[d.name] = d);
