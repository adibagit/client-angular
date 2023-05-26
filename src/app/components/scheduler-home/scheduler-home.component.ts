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

@Component({
  selector: 'app-scheduler-home',
  templateUrl: './scheduler-home.component.html',
  styleUrls: ['./scheduler-home.component.css']
})
export class SchedulerHomeComponent {
  tickets?: Ticket[];
  workflows?:Workflow[];

  displayedColumns: string[] = ['ticketid', 'client', 'description', 'property','status','priority','ticketdate','lastmodified','actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

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
    })
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

  openUpdateWorkflow(id:number){
    // this.departmentService.setId(id);
    // this.dialog.open(UpdateDepartmentComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isWorkflowExist(ticketid:number):boolean{
    // let exists =false;
    // this.workflowService.isWorkflowExist(ticketid).subscribe({
    //   next:(res)=>{
    //     exists= res;
    //   }
    // });
    // return exists;
    if (this.workflows) {
      const workflowExists = this.workflows.some((workflow) => workflow.ticket?.ticketid === ticketid);
      return workflowExists;
    }
    return false;
  }

  viewWorkflow(ticketid: number) {
    
  }
  

}
