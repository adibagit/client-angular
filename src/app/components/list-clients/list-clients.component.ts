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

  ngOnInit(): void {
    this.getAllClients();
  }

  clients: any = {
    firstname:'',
    lastname:'',
    emailid:'',
    picture:'',
    usertype:'',
    regdate:''
  };

  constructor( private userService:UserService, private ticketService :TicketService,private dialog: MatDialog){}

  getAllClients(){
    this.userService.getAllClients().subscribe({
      next:(result)=>{
        this.clients = result;
      }
    });
  }

  getTotalTickets(userID : number):number{
    let count=0;
    this.ticketService.getTicketsByUser(userID).subscribe({
      next:(res)=>{
          console.log(res);
          alert("in");
      }
    });
    return count;
  }
}
