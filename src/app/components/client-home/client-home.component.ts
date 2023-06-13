import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { TicketService } from 'src/app/services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/services/image.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { TrackTicketComponent } from '../track-ticket/track-ticket.component';
import { ListImagesComponent } from '../list-images/list-images.component';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { SelectedComponentService } from 'src/app/services/selected-component.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    private ticketService : TicketService,
    private snackbar : MatSnackBar,
    private imageService : ImageService,
    private workflowService : WorkflowService,
    private feedbackService : FeedbackService,
    private selectedComponentService: SelectedComponentService
  ){}

  clientId : number = Number(sessionStorage.getItem('userid'));
  tickets ?: any;
  allTickets?:any;
  ticketImages: { [ticketId: number]: any[] } = {};
  selectedStatus:string ;
  username:any;
  isLoading = true;

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.isLoading=true;
    this.getAllTicketByUser();
    this.selectedComponentService.getStatus().subscribe((status: string) => {
      this.selectedStatus = status;
      this.filterTicketsByStatus();
    });
  }

  openAddTicket(){
    this.dialog.open(AddTicketComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  getAllTicketByUser(){
    this.isLoading=true;
    this.ticketService.getTicketsByUser(this.clientId).subscribe({
      next:(res)=>{
        this.allTickets = res;
        this.tickets = res; // Assign tickets as well
        this.isLoading=false;
        for (const ticket of this.tickets) {
          this.retrieveTicketImages(ticket.ticketid);
        }
        this.filterTicketsByStatus();
      },
      error:(err)=>{
        this.snackbar.open("Failed fetching records.","Dismiss", { duration: 5000 });
        this.isLoading=false;
      }
    })
  }

  filterTicketsByStatus() {
    if (this.selectedStatus === 'all') {
      this.tickets = this.allTickets;
    } else {
      this.tickets = this.allTickets.filter((ticket: { status: { status: string } }) => ticket.status.status === this.selectedStatus);
    }
  }

  retrieveTicketImages(ticketId: number) {
    this.imageService.getImagesByTicket(ticketId).subscribe({
      next:(response) => {
        this.ticketImages[ticketId] = response;
      }
    });
  }
  openTrackTicket(ticketId:number){
    this.workflowService.id = ticketId;
    this.dialog.open(TrackTicketComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteTicket(ticketId:number){
    this.ticketService.deleteTicket(ticketId).subscribe({
      next:(res)=>{
        this.snackbar.open("Deleted !","Dismiss", { duration: 5000 });
        this.ngOnInit();
      },
      error:(err)=>{
        this.snackbar.open("Deleted !","Dismiss", { duration: 5000 });
        this.ngOnInit();
      }
    });
  }

  openViewImages(ticketId : number){
    this.imageService.ticketImages = this.ticketImages[ticketId];
    this.dialog.open(ListImagesComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openAddFeedback(ticketId : number){
    this.feedbackService.id = ticketId;
    this.dialog.open(AddFeedbackComponent).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  
}
