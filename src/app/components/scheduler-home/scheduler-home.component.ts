import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
import { WorkflowService } from 'src/app/services/workflow.service';
import { Workflow } from 'src/app/models/worklow';
import { TrackTicketComponent } from '../track-ticket/track-ticket.component';

@Component({
  selector: 'app-scheduler-home',
  templateUrl: './scheduler-home.component.html',
  styleUrls: ['./scheduler-home.component.css']
})

export class SchedulerHomeComponent {

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  tickets?: Ticket[];
  workflows?:Workflow[];
  displayedColumns: string[] = ['client', 'description', 'property','status','ticketdate','lastmodified','actions'];
  dataSource !: MatTableDataSource<any>;
  isWorkflowSet:boolean;

  constructor(
    private ticketService: TicketService, 
    private router: Router,
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private workflowService:WorkflowService
  ){}

  ngOnInit(): void {
    this.getAllTickets();
    this.workflowService.getAllWorkflows().subscribe({
      next:(res)=>{
        this.workflows=res;
      }
    });
  }

  getAllTickets(){
    this.ticketService.getAllTickets().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator  = this.paginator;
        this.tickets = res;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }


  openCreateWorkflow(ticketId:number){
    this.ticketService.id = ticketId;
    this.dialog.open(AddWorkflowComponent).afterClosed().subscribe(res=>{
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isWorkflowExist(ticketid:number):boolean{
    if (this.workflows) {
      const workflowExists = this.workflows.some((workflow) => workflow.ticket?.ticketid === ticketid);
      return workflowExists;
    }
    return false;
  }

  openWorkflow(ticketid: number) {
    this.workflowService.id=ticketid;
    this.dialog.open(TrackTicketComponent);
  }

}
