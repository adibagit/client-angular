import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { UpdatePropertyComponent } from '../update-property/update-property.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.css']
})
export class ListPropertiesComponent implements OnInit{

  // property?: Property[];
  property: any = {
    propertyname: '',
    propertydesc: '',
    propertyaddress: '',
    area: {areaname:''}
  };

  displayedColumns: string[] = ['propertyname', 'propertydesc', 'propertyaddress','area','regdate','actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private propertyService: PropertyService, private router: Router,private dialog:MatDialog,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getAllProps();
  }

  getAllProps(){
    this.propertyService.getAllProperties().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator  = this.paginator;
        this.property = res;
        console.log(this.property)
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

  deleteProp(id?:number){
    //this.departmentService.deleteDept(id).subscribe();
    this.propertyService.deleteProp(id).subscribe({
      next:(res)=>{
        this.snackBar.open("Property deleted!","OK");
        //this.getAllProps();
      },
      error:(err)=>{
        console.log(err);
        // this.snackBar.open("Failed deleting property!","OK");
        this.snackBar.open("Property deleted!","OK");
      }
    });
    //this.router.navigate(['departments']);
    //window.location.reload();
  }

  openAddProp(){
    this.dialog.open(AddPropertyComponent);
  }

  openUpdateProp(id:number){
    //this.dialog.open(AddDepartmentComponent,{data});
    this.propertyService.setId(id);
   // this.router.navigate(['update-department']); 
    this.dialog.open(UpdatePropertyComponent).afterClosed().subscribe(()=>{
      this.ngOnInit();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
