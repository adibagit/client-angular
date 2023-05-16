import { Area } from "./area";

export class User {
    userid?: number;
    firstname?: string;
    lastname?: string;
    emailid?:string;
    phoneno?:string;
    address?:string;
    area?:Area;
    picture?:string;
    usertype?:string;
    regdate?:Date;
    lastmodified?:Date;
}
