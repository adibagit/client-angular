import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkflowService } from 'src/app/services/workflow.service';

@Component({
  selector: 'app-track-ticket',
  templateUrl: './track-ticket.component.html',
  styleUrls: ['./track-ticket.component.css']
})
export class TrackTicketComponent implements OnInit {

  ticketId : number = this.workflowService.id ?? 0;
  workflows:any;
  isLoading = true;
  
  constructor(
    private workflowService: WorkflowService,
    private snackbar : MatSnackBar
  ){}

  ngOnInit(): void {
    this.isLoading = true;
    this.workflowService.getAllWorkflowsByTicket(this.ticketId).subscribe({
      next:(res)=>{
        this.workflows = res;
        this.isLoading = false;
      },
      error:(err)=>{
        this.snackbar.open("Something went wrong","Dismiss", { duration: 5000 });
        this.isLoading = false;
      }
    })
  }

}