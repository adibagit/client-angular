import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerService } from 'src/app/services/manager.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { UpdateManagerComponent } from '../update-manager/update-manager.component';         

@Component({
  selector: 'app-list-managers',
  templateUrl: './list-managers.component.html',
  styleUrls: ['./list-managers.component.css']
})
export class ListManagersComponent {

  manager: any = {
    managerid: '',
    user:{firstname:'',lastname:'',emailid:'',phoneno:'',picture:''},
    department: {deptname:''},
  };
  isLoading = true;

  constructor(
    private managerservice: ManagerService,
    private dialog:MatDialog,
    private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.getAllProps();
  }

  getAllProps(){
    this.isLoading=true;
    this.managerservice.getAllManagers().subscribe({
      next:(res)=>{
        this.manager = res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackbar.open("Failed retrieving data!","OK", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

  deleteManager(id?:number){
    this.managerservice.deleteManager(id).subscribe({
      next:(res)=>{
        this.snackbar.open("Manager deleted!","OK", { duration: 5000 });
        this.ngOnInit();
      },
      error:(err)=>{
        this.snackbar.open("Failed deleting manager!","OK", { duration: 5000 });
        this.ngOnInit();
      }
    });
  }

  openUpdateManager(id:number){
    this.managerservice.setId(id);
    this.dialog.open(UpdateManagerComponent)
  }

}
