import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent implements OnInit{

  property: any = {
    propertyname: '',
    propertydesc: '',
    propertyaddress: '',
    area: {zipcode:'',areaname:''}
  };
  areas?:any;

  constructor(
    private propertyService: PropertyService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getPropById();
    this.propertyService.getAllAreas().subscribe({
      next:(res)=>{
        this.areas = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong!","Dismiss", { duration: 5000 });
      }
    });
  }

  updateProp(){
    this.propertyService.updateProp(this.property).subscribe({
      next:(res)=>{
        this.snackBar.open("Property updated successfully.","OK", { duration: 5000 });
      },
      error:(err)=>{
        this.snackBar.open("Failed updating property!","Dismiss", { duration: 5000 });
      }
    });
  }

  getPropById(){
    this.propertyService.getPropById().subscribe(data=>{
      this.property=data; 
    })
  }

}