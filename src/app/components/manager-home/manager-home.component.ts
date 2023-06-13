import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Workflow } from 'src/app/models/worklow';
import { LogService } from 'src/app/services/log.service';
import { ManagerService } from 'src/app/services/manager.service';
import { TicketService } from 'src/app/services/ticket.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { AssignTicketComponent } from '../assign-ticket/assign-ticket.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent {

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  workflows?: Workflow[];
  manager:any;
  userId = Number(sessionStorage.getItem('userid'));
  deptId:any;
  logs:any;
  currentLog:any;
  assignedTo:any;
  displayedColumns: string[] = ['ticket', 'department', 'status','description','date','actions','details'];
  dataSource !: MatTableDataSource<any>;
  isLoading = true;

  constructor(
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private workflowService:WorkflowService,
    private managerService:ManagerService,
    private logService:LogService,
    private ticketService:TicketService
  ){}

  ngOnInit(): void {
    this.isLoading=true;
    this.managerService.getManagerByUser(this.userId).subscribe({
      next:(res)=>{
        this.manager=res;
        this.deptId=this.manager[0].department.deptid;
        sessionStorage.setItem("deptid",this.deptId);
        this.getAllWorkflows(this.deptId);
      }
    })
    this.logService.getAllLogs().subscribe({
      next:(res)=>{
        this.logs=res;
      }
    })
  }

  getAllWorkflows(deptId:number){
    this.isLoading=true;
    this.workflowService.getWorkflowsByDept(deptId).subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator  = this.paginator;
        this.workflows = res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data!","OK", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAssignTicket(workflowId:number){
    this.logService.workflowid=workflowId;
    this.logService.deptid=this.deptId;
    this.dialog.open(AssignTicketComponent).afterClosed().subscribe(res=>{
      this.ngOnInit();
    });
  }

  isWorkflowAssigned(workflowId:number):boolean{
    if (this.logs) {
      const workflowAssigned: boolean = this.logs.some((log: any) =>
        log.workflow?.workflowid === workflowId &&
        log.status.statusid === 11
      );

      if(workflowAssigned){
        this.currentLog = this.logs.find((log: any) =>
          log.workflow?.workflowid === workflowId && log.status.statusid === 11
        );
        this.currentLog=this.currentLog.employee.user.firstname;
        console.log(this.currentLog)
      }
      return workflowAssigned;
    }
    return false;
  }

  viewTicketDetails(ticketId:number){
    this.ticketService.id=ticketId;
    this.dialog.open(TicketDetailsComponent)
  }

}
