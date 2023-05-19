import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent implements OnInit{

  // property: Property = new Property();
  property: any = {
    propertyname: '',
    propertydesc: '',
    propertyaddress: '',
    area: {zipcode:'',areaname:''}
  };
  areas?:any;

  ngOnInit(): void {
    this.getPropById();

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
  constructor(private propertyService: PropertyService,private snackBar: MatSnackBar){}
  updateProp(){
    this.propertyService.updateProp(this.property).subscribe({
      next:(res)=>{
        this.snackBar.open("Property updated successfully. Please Refresh!","OK");
      },
      error:(err)=>{
        console.log(err);
        this.snackBar.open("Failed updating property!","OK");
      }
    });
  }

  getPropById(){
    this.propertyService.getPropById().subscribe(data=>{
      this.property=data; 
    })
  }

}
