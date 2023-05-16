import { Area } from "./area";

export class Property {
    propertyid?: number;
    propertyname?: string;
    propertydesc?: string;
    propertyaddress?:string;
    area?:Area;
    regdate?:Date;
    lastmodified?:Date;
}
