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
  ngOnInit(): void {
    this.getAllFeedbacks();
  }
  feedbacks : any;

  constructor(
    private feedbackService: FeedbackService,
    private snackBar : MatSnackBar
  ){}

  getAllFeedbacks(){
    this.feedbackService.getAllFeedbacks().subscribe({
      next:(res)=>{
        this.feedbacks=res;
        console.log(res)
      },
      error:(err)=>{
        this.snackBar.open("Failed retrieving data! Try restarting the server.","OK");
      }
    });
  }

}
