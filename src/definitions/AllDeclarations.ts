import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {Employee} from "@/definitions/Employee";
import {Car} from "@/definitions/Car";
import {Customer} from "@/definitions/Customer";


export const allDeclarationsList: EntityDeclaration[] = [
    Employee,
    Car,
    Customer,
]

export const allDeclarationsMap: Record<string, EntityDeclaration> = {}
allDeclarationsList.forEach(d => allDeclarationsMap[d.name] = d);
