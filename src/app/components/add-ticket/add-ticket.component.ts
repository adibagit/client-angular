import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TicketService } from 'src/app/services/ticket.service';

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
  constructor(private ticketService : TicketService,private propertyService :PropertyService, private router:Router,private snackBar: MatSnackBar){}

  properties?:any;
  

  ngOnInit(): void {
    this.ticket.client.userid = localStorage.getItem('userid'); 
    this.propertyService.getAllProperties().subscribe({
      next:(res)=>{
        console.log(res)
       this.properties = res;
      },
      error:(err)=>{
        this.snackBar.open("Something went wrong! Try restarting the server.","OK");
        console.log(err);
      }
    });
  }


  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr: string[] = ['Choose File'];
  uploadFileEvt(imgFile: any): void {
    if (imgFile.target.files && imgFile.target.files.length) {
      this.fileAttr = [];
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr.push(file.name);
      });

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = [];
    }
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    const selectedFilesCount: number = files.length;
  
    if (selectedFilesCount > 5) {
      this.snackBar.open("Maximum 5 images can be uploaded!","OK");
      return;
    }
    if(selectedFilesCount != 0){
      for (let i = 0; i < selectedFilesCount; i++) {
        const file: File = files[i];
        // Perform any necessary operations with the file
        console.log("Selected file:", file);
      }
    } 
  }
  

  addTicket(){
    console.log(this.ticket)
    this.ticketService.addTicket(this.ticket).subscribe({
      next:(res)=>{
        this.snackBar.open("Ticket added successfully. Please Refresh! ","OK");
      },
      error:(err)=>{
        this.snackBar.open("Failed adding ticket","OK");
      }
    });
    this.router.navigate(['clientDashboard']);
  }


}
