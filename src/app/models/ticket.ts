import { Property } from "./property";
import { Status } from "./status";
import { User } from "./user";

export class Ticket {
    ticketid?: number;
    client?: User;
    description?: string;
    property?: Property;
    status?: Status;
    priority?:number;
    ticketdate?: Date;
    lastmodified?:Date
}