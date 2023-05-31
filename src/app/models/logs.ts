import { Department } from "./department";
import { Status } from "./status";
import { Ticket } from "./ticket";
import { Workflow } from "./worklow";
import { Employee } from "./employee";


export class Logs{
    logid?: number;
    workflow?: Workflow;
    employee?: Employee;
    status?: Status;
    comment?:string;
    logdate?:Date
}

