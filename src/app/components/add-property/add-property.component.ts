import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent  implements OnInit{

  property: any = {
    propertyname: '',
    propertydesc: '',
    propertyaddress: '',
    area: {zipcode:''}
  };
  areas?:any;

  constructor(
    private propertyService : PropertyService, 
    private router:Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPropertyComponent>
  ){}
  
  ngOnInit(): void {
    this.property.area = {}; 
    this.propertyService.getAllAreas().subscribe({
      next:(res)=>{
       this.areas = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong!","Dismiss", { duration: 5000 });
      }
    });
  }

  addProp(){
    this.propertyService.addProperty(this.property).subscribe({
      next:(res)=>{
        this.snackBar.open("Property added successfully.","OK", { duration: 5000 });
        this.dialogRef.close();
      },
      error:(err)=>{
        this.snackBar.open("Failed adding property!","Dismiss", { duration: 5000 });
      }
    });
    this.router.navigate(['adminDashboard']);
  }
}