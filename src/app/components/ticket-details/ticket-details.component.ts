import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { ImageService } from 'src/app/services/image.service';
import { S3storageService } from 'src/app/services/s3storage.service';
import { TicketService } from 'src/app/services/ticket.service';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  ticket:any;
  images:any;
  workflows:any;
  ticketId:number;
  url:string;

  constructor(
    private ticketService : TicketService,
    private imageService : ImageService,
    private workflowService : WorkflowService,
    private configService : ConfigService
  ){
    this.url=this.configService.baseURL;
  }

  ngOnInit(): void {
    this.ticketId=Number(this.ticketService.id);
    this.getTicketDetails();
  }

  getTicketDetails(){
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next:(res)=>{
        this.ticket = res;
        console.log(this.ticket)
      }
    });
    this.imageService.getImagesByTicket(this.ticketId).subscribe({
      next:(res)=>{
        this.images = res;
        console.log(this.images)
      }
    });
    this.workflowService.getAllWorkflowsByTicket(this.ticketId).subscribe({
      next:(res)=>{
        this.workflows = res;
        console.log(this.workflows)
      }
    });
  }
}
