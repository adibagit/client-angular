import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  constructor(private propertyService : PropertyService, private router:Router,private snackBar: MatSnackBar){}

  areas?:any;
  

  ngOnInit(): void {
    this.property.area = {}; 
    this.propertyService.getAllAreas().subscribe({
      next:(res)=>{
        console.log(res)
       this.areas = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong! Try restarting the server.","OK");
        console.log(err);
      }
    });
  }

  addProp(){
    this.propertyService.addProperty(this.property).subscribe({
      next:(res)=>{
        this.snackBar.open("Property added successfully.","OK");
      },
      error:(err)=>{
        this.snackBar.open("Failed adding property!","OK");
      }
    });
    this.router.navigate(['adminDashboard']);
  }
}
