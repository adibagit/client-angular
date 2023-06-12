import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { TicketService } from 'src/app/services/ticket.service';
import { ImageService } from 'src/app/services/image.service';
import { MatDialogRef } from '@angular/material/dialog';
import { S3storageService } from 'src/app/services/s3storage.service';
@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  ticket: any = {
    client: {userid:''},
    description: '',
    property: {propertyid:''},
    status:{statusid:1}
  };
  images: File[];
  url:any;
  addedTicket:any;
  properties?:any;

  constructor(
    private ticketService : TicketService,
    private propertyService :PropertyService, 
    private s3service: S3storageService,
    private snackBar: MatSnackBar,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<AddTicketComponent>
  ){}

  ngOnInit(): void {
    this.ticket.client.userid = sessionStorage.getItem('userid');
    this.propertyService.getAllProperties().subscribe({
      next:(res)=>{
       this.properties = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong! Try restarting the server.","OK");
      }
    });
  }

  handleFileInput(event: any): void {
    this.images = event.target.files;
    console.log("file aai : ",this.images)
  }
  
  addTicket(): void {
    if(this.images && this.images.length && this.images.length > 5 ) {
      this.snackBar.open("Maximum 5 images are allowed!","OK");
    }
    else {
      this.ticketService.addTicket(this.ticket).subscribe({
        next:(res) => {
          this.addedTicket = res;
          this.snackBar.open("Ticket added successfully.", "OK");
          let url:any;
          Array.from(this.images).forEach((image: File) => {
            this.s3service.uploadImage(image).subscribe({
              next:(res:string)=>{
                  url=res;
                  const imageDetails = {
                  imagename: image.name,
                  imagepath: url, 
                  ticket: {
                    ticketid: this.addedTicket.ticketid
                  }
                };
                this.imageService.addImage(imageDetails).subscribe();
              }
            });
          });   
          this.dialogRef.close();
        },
        error:(err) => {
          this.snackBar.open("Failed adding ticket", "OK");
        } 

      }); 
    }     
  }


}