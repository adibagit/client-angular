import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-list-feedbacks',
  templateUrl: './list-feedbacks.component.html',
  styleUrls: ['./list-feedbacks.component.css']
})
export class ListFeedbacksComponent implements OnInit{

  feedbacks : any;
  isLoading = true;

  ngOnInit(): void {
    this.getAllFeedbacks();
  }
  
  constructor(
    private feedbackService: FeedbackService,
    private snackBar : MatSnackBar
  ){}

  getAllFeedbacks(){
    this.isLoading=true;
    this.feedbackService.getAllFeedbacks().subscribe({
      next:(res)=>{
        this.feedbacks=res;
        this.isLoading=false;
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data!","OK", { duration: 5000 });
        this.isLoading=false;
      }
    });
  }

}