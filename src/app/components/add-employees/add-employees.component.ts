import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialAuthService, } from '@abacritt/angularx-social-login';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent {
  employee: any = {
    user:{userid:''},
    department: {deptid:''}
  };
  departments?:any;
  user : User = new User();

  deptselected=false;

  userResponse : any;

  constructor(private empService: EmployeeService,
    private snackBar: MatSnackBar,
    private deptService: DepartmentService, 
    private socialAuthService: SocialAuthService,
    private userService: UserService, 
    private router:Router,
    private httpClient: HttpClient){}

  ngOnInit(): void {
    this.employee.department = {}; 
    this.deptService.getAllDepartments().subscribe({
      next:(res)=>{
        console.log(res)
       this.departments = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong! Try restarting the server.","OK");
        console.log(err);
      }
    });

  }

  addEmp(){

    this.socialAuthService.authState.subscribe(async (user) => {
      console.log("user:",user);
      
      if(await this.isExist(user.email)){
          this.httpClient.get(`http://localhost:9001/api/role/${user.email}`, { responseType: 'text' }).subscribe({
            next: (response: string) => {
              //alert(response);
              console.log(response);
              if(response=='client'){
                this.router.navigate(['usersetup']);
              }else{
                alert("Redirect to employee")
              }
              
              //redirect to response(userrole) page this.router.navigate(['clientDashboard']);
            },
            error: (error: any) => {
              this.snackBar.open("Something went wrong!","OK");
              console.error('Error occurred while retrieving user role:', error);
            }
          });
      }else{
        this.user.firstname = user.firstName;
        this.user.lastname = user.lastName;
        this.user.emailid = user.email;
        this.user.picture = user.photoUrl;
        this.user.usertype = 'employee';
        this.userService.addUser(this.user).subscribe({
          next:(res)=>{
            this.userResponse = res;
            //this.snackBar.open("User Registered successfully.","OK");
            this.employee.user.userid = this.userResponse.userid;
            alert(this.userResponse.userid)
            this.empService.addEmployee(this.employee).subscribe({
              next:(res)=>{
                this.snackBar.open("Employee added successfully. Please Refresh! ","OK");
              },
              error:(err)=>{
                this.snackBar.open("Failed adding employee!","OK");
              }
            });
            this.router.navigate(['adminDashboard']);
          },
          error:(err)=>{
            this.snackBar.open("User registeration failed!","OK");
            console.log(err);
          }
        });
        this.router.navigate(['adminDashboard']);
      }
    });

    // console.log(this.property)
    
  }

  async isExist(email: string): Promise<boolean> {
    const observable = this.userService.userExist(email);
    const result = await firstValueFrom(observable);
    return result as boolean;
  }

  deptselect(){ this.deptselected=true;}

}
