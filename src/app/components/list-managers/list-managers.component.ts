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

  constructor(
    private managerservice: ManagerService,
    private dialog:MatDialog,
    private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.getAllProps();
  }

  getAllProps(){
    this.managerservice.getAllManagers().subscribe({
      next:(res)=>{
        this.manager = res;
      },
      error:(err)=>{
        this.snackbar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  deleteManager(id?:number){
    this.managerservice.deleteManager(id).subscribe({
      next:(res)=>{
        this.snackbar.open("Manager deleted!","OK");
        this.ngOnInit();
      },
      error:(err)=>{
        this.snackbar.open("Failed deleting manager!","OK");
        this.ngOnInit();
      }
    });
  }

  openUpdateManager(id:number){
    this.managerservice.setId(id);
    this.dialog.open(UpdateManagerComponent)
  }

}
