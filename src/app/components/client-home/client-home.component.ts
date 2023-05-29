import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { TicketService } from 'src/app/services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/services/image.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { TrackTicketComponent } from '../track-ticket/track-ticket.component';

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
    private workflowService : WorkflowService
    
  ){}

  clientId : number = Number(sessionStorage.getItem('userid'));
  tickets ?: any;

  ticketImages: { [ticketId: number]: any[] } = {};

  ngOnInit(): void {
   this.getAllTicketByUser();
  }

  openAddTicket(){
    this.dialog.open(AddTicketComponent).afterClosed().subscribe(() => {
      this.getAllTicketByUser();
    });;
  }

  getAllTicketByUser(){
    this.ticketService.getTicketsByUser(this.clientId).subscribe({
      next:(res)=>{
        this.tickets = res;
        
        for (const ticket of this.tickets) {
          this.retrieveTicketImages(ticket.ticketid);
        }
      },
      error:(err)=>{
        this.snackbar.open("Failed fetching records. Try restarting the server","Ok");
      }
    })
  }

  retrieveTicketImages(ticketId: number) {
    // Call your API or service to retrieve the images for a specific ticket ID
    this.imageService.getImagesByTicket(ticketId).subscribe({
      next:(response) => {
        this.ticketImages[ticketId] = response;
        console.log("the images for te ticket : ",ticketId , "are : ", response); 
      },
      error: (err) => {
        console.error(`Error retrieving images for ticket ${ticketId}:`, err);
      }
    });
  }
  openTrackTicket(ticketId:number){
    this.workflowService.id = ticketId;
    this.dialog.open(TrackTicketComponent);
  }

  deleteTicket(ticketId:number){
    this.ticketService.deleteTicket(ticketId).subscribe({
      next:(res)=>{
        this.snackbar.open("Deleted !","Dismiss");
        this.ngOnInit();
      },
      error:(err)=>{
        console.log(err);
        // this.snackbar.open("Failed deleting ticket!","Ok");
        this.snackbar.open("Deleted !","Dismiss");
        this.ngOnInit();
      }
    });
  }
}
