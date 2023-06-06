import { Employee } from "./employee";
import { Status } from "./status";
import { Workflow } from "./worklow";

export class Log {
    logid?: number;
    workflow?: Workflow;
    employee?: Employee;
    status?: Status;
    comment?:string;
    logdate?: Date;
}