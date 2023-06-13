import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css']
})
export class ListTicketsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  tickets: any = {
    clientid: '',
    ticket_description: '',
    property: {propertyid: '',propertyname: ''},
    status: {statusid: '',statusname: ''},
    ticket_date: '',
    last_modified: ''
  };
  displayedColumns: string[] = ['clientid', 'ticket_description', 'property','status','ticket_date','last_modified'];
  dataSource !: MatTableDataSource<any>;
  isLoading = true;

  constructor(
    private ticketservice: TicketService,
    private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.isLoading=true;
    this.getAlltick();
  }

  getAlltick(){
    this.ticketservice.getAllTickets().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator  = this.paginator;
        this.tickets = res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackbar.open("Failed retrieving data!","OK", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}