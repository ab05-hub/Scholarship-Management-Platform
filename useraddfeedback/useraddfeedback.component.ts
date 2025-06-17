import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {
  newFeedback : Feedback = {
    FeedbackId : 0,
    UserId : 0,
    FeedbackText : '',
    Date : new Date()
  }
 
  @ViewChild('feedbackForm') feedbackForm! : NgForm
 
  isUserDialogOpen : boolean = false
 
  constructor(private feedbackService : FeedbackService, private activatedRouter : ActivatedRoute, private authService:AuthService) { }
 
  ngOnInit(): void {
    this.newFeedback.UserId = this.authService.getUserId();
  }
 
  addFeedback() {
    if(this.feedbackForm.valid) {
      this.feedbackService.sendFeedback(this.newFeedback).subscribe(() => {
      this.feedbackForm.resetForm();
      })
      this.openDialog();
    }
  }
 
  openDialog() {
    this.isUserDialogOpen = true;
  }
 
  closeDialog() {
    this.isUserDialogOpen = false;
  }
}
