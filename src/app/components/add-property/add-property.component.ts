import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Area } from 'src/app/models/area';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent  implements OnInit{

  //property:Property = new Property();
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
    // if (this.property.area) {
    //   const payload = {
    //     propertyname: this.property.propertyname,
    //     propertydesc: this.property.propertydesc,
    //     propertyaddress: this.property.propertyaddress,
    //     area: {
    //       zipcode: this.property.area.zipcode
    //     }
    //   };
    
    // console.log(payload);

    console.log(this.property)
    this.propertyService.addProperty(this.property).subscribe({
      next:(res)=>{
        this.snackBar.open("Property added successfully. Please Refresh! ","OK");
        //window.location.reload();
      },
      error:(err)=>{
        //alert("Failed to add the Department!")
        this.snackBar.open("Failed adding property!","OK");
      }
    });
    this.router.navigate(['adminDashboard']);
  }
}
