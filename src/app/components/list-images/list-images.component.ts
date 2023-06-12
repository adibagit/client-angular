import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/services/image.service';
import { S3storageService } from 'src/app/services/s3storage.service';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit{

  images:any;
  selectedIndex=0;

  constructor(
    private imageService: ImageService,
    private s3Service: S3storageService,
    private snackbar: MatSnackBar,
    private dialog : MatDialogRef<ListImagesComponent>
  ){}

  ngOnInit(): void {
    this.images = this.imageService.ticketImages;
    console.log(this.images)
  }

  deleteImage(id:number,imageName:string,imagePath:string){
    this.s3Service.deleteImage(imagePath).subscribe({
      next:(next)=>{
        this.dialog.close();
      }
    });
    this.imageService.deleteImage(id).subscribe({
      next:(next)=>{
        this.snackbar.open("Image : "+imageName+" has been deleted!","Dismiss");
        this.dialog.close();
      }
    })
  }
  
}
