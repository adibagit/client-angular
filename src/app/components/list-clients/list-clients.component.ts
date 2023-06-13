import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit{

  clients: any = {
    firstname:'',
    lastname:'',
    emailid:'',
    picture:'',
    usertype:'',
    regdate:'',
  };
  totalTickets=0;
  selectedClientID: number | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.getAllClients();
  }

  constructor( 
    private userService:UserService, 
    private ticketService :TicketService
  ){}

  getAllClients(){
    this.isLoading=true;
    this.userService.getAllClients().subscribe({
      next:(result)=>{
        this.clients = result;
        this.isLoading=false;
      }
    });
  }

  getTotalTickets(userId : number){
    this.selectedClientID = userId; 
    this.ticketService.getTicketsByUser(userId).subscribe({
      next:(res)=>{
        this.totalTickets = Object.keys(res).length;
      }
    });
  }

}
