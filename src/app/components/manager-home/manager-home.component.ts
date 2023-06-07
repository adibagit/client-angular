import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { Workflow } from 'src/app/models/worklow';
import { LogService } from 'src/app/services/log.service';
import { ManagerService } from 'src/app/services/manager.service';
import { TicketService } from 'src/app/services/ticket.service';
import { WorkflowService } from 'src/app/services/workflow.service';
import { AssignTicketComponent } from '../assign-ticket/assign-ticket.component';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent {
  workflows?: Workflow[];
  manager:any;
  userId = Number(sessionStorage.getItem('userid'));
  deptId:number;
  logs:any;
  assignedTo:string;

  displayedColumns: string[] = ['ticket', 'department', 'status','description','priority','date','actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private ticketService: TicketService, 
    private router: Router,
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private workflowService:WorkflowService,
    private managerService:ManagerService,
    private logService:LogService
  ){}

  ngOnInit(): void {
    this.managerService.getManagerByUser(this.userId).subscribe({
      next:(res)=>{
        this.manager=res;
        this.deptId=this.manager[0].department.deptid
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
    //get workflows dept wise
    this.workflowService.getWorkflowsByDept(deptId).subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator  = this.paginator;
        this.workflows = res;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
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
      console.log("In check assigned func.",this.logs)
      console.log(workflowId,"is assigned to : " ,this.logs[0].employee.user.firstname)
      this.assignedTo=this.logs[0].employee.user.firstname;
      const workflowAssigned: boolean = this.logs.some((log: any) =>
        log.workflow?.workflowid === workflowId &&
        log.status.statusid === 11
      );
      return workflowAssigned;
    }
    return false;
  }
}
