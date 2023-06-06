import { Ticket } from "./ticket";
import { User } from "./user";

export class Feedback {
    feedbackid?: number;
    user?:User;
    ticket?: Ticket;
    feedbackdesc?: string;
    feedbackdate?:Date;
    lastmodified?:Date
}
