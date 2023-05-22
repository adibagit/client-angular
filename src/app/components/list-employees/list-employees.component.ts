import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateEmployeesComponent } from '../update-employees/update-employees.component';
import { EmployeeRequestsComponent } from '../employee-requests/employee-requests.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent {
  employee: any = {
    empid: '',
    user: {firstname:'',lastname:'',emailid:'',phoneno:'',picture:''},
    department: {deptname:''},
  };

  // notificationMessage: string | undefined;
  noOfEmployeeRequest : number;

  constructor(private empService: EmployeeService,private dialog:MatDialog,private snackBar: MatSnackBar,private notificationService: NotificationService){}
  ngOnInit(): void {
    this.getAllProps();
    // this.notificationService.getNotificationObservable().subscribe((message: string) => {
    //   this.notificationMessage = message;
    // });

    this.empService.getEmployeeRequest().subscribe({
      next:(res)=>{
        this.noOfEmployeeRequest = res.length;
        console.log("length hai",res.length);
        // this.employeeService.noOfEmployeeRequest = this.employees.length;
        //count emps for badge 
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  getAllProps(){
    this.empService.getAllEmployees().subscribe({
      next:(res)=>{
        // this.dataSource = new MatTableDataSource(res);
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator  = this.paginator;
        this.employee = res;
        console.log(this.employee)
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  deleteEmp(id?:number){
    //this.departmentService.deleteDept(id).subscribe();
    this.empService.deleteEmp(id).subscribe({
      next:(res)=>{
        this.snackBar.open("Employee deleted!","OK");
        //this.getAllProps();
      },
      error:(err)=>{
        console.log(err);
        // this.snackBar.open("Failed deleting property!","OK");
        this.snackBar.open("Employee deleted!","OK");
      }
    });
    //this.router.navigate(['departments']);
    //window.location.reload();
  }

  openAddEmployeeRequest(){
    const dialogRef = this.dialog.open(EmployeeRequestsComponent);
    dialogRef.afterClosed().subscribe(() => {
      // Reload the current component
      this.ngOnInit();
    });
  }

  openUpdateEmp(id:number){
    //this.dialog.open(AddDepartmentComponent,{data});
    this.empService.setId(id);
   // this.router.navigate(['update-department']); 
    this.dialog.open(UpdateEmployeesComponent);
  }

}
