import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent {
  constructor(private dialog:MatDialog){}
  openAddTicket(){
    this.dialog.open(AddTicketComponent);
  }
}
