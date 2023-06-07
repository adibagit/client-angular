import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent  implements OnInit{
  feedback: any = {
    user: {userid:''},
    ticket:{ticketid:''},
    feedbackdesc: ''
  };

  
  hasFeedback: boolean;
  previousFeedback:any;

  constructor(private feedbackService : FeedbackService, private router:Router,private snackBar: MatSnackBar,private dialogRef: MatDialogRef<AddFeedbackComponent>){}  

  ngOnInit(): void {
    this.feedback.user.userid = sessionStorage.getItem('userid');
    this.feedback.ticket.ticketid=this.feedbackService.id;
    this.feedbackService.feedbackExist(this.feedback.user.userid,this.feedback.ticket.ticketid).subscribe({
      next:(res)=>{
        this.hasFeedback=res;
        if(this.hasFeedback){
          this.feedbackService.getFeedbackByUserAndTicket(this.feedback.user.userid,this.feedback.ticket.ticketid).subscribe({
            next:(result)=>{
              this.previousFeedback = result;
              this.feedbackService.feedbackId=this.previousFeedback[0].feedbackid;
              this.feedback.feedbackdesc= this.previousFeedback[0].feedbackdesc;
            }
          });
        }
      }
    });  
  }

  addFeedback(){
    
    this.feedbackService.addFeedback(this.feedback).subscribe({
      next:(res)=>{
        this.snackBar.open("Feedback added successfully.","OK");
        this.dialogRef.close();
      },
      error:(err)=>{
        this.snackBar.open("Failed adding feedback!","OK");
      }
    });
    this.router.navigate(['clientDashboard']);
  }

  updateFeedback(){
  
    this.feedbackService.updateFeedback(this.feedback).subscribe({
      next:(res)=>{
        this.snackBar.open("Feedback updated successfully.","OK");
        this.dialogRef.close();
      },
      error:(err)=>{
        this.snackBar.open("Failed updating feedback!","OK");
      }
    });
    this.router.navigate(['clientDashboard']);
  }

}
