import { Department } from "./department";
import { Status } from "./status";
import { Ticket } from "./ticket";

export class Workflow {
    workflowid?: number;
    ticket?: Ticket;
    department?: Department;
    status?: Status;
    description?:string;
    priority?: number;
    date?:Date
}