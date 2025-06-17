import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent {
feedbackIdtoDelete!: number ;
  feedbacks!: Feedback[];
  selectedFeedbackId!: number;
  isModalOpen!: boolean;
  UserId: number = 0;
 
  pageOfItems: Array<any> = [];
 
  currentIndex = -1;
  page = 1;
  count = 6;
 
 
  constructor(private feedbackService: FeedbackService, private router: Router,private authService:AuthService) { }
  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
     //Check and match the UserId variable name...
     console.log(this.UserId);
 
    this.feedbackService.getAllFeedbacksByUserId(this.UserId).subscribe(data => { this.feedbacks = data })
  }
 
  openDeleteModal(feedbackId: number): void {
    this.feedbackIdtoDelete = feedbackId;
    this.isModalOpen = true;
  }
  closeDeleteModal(): void {
    this.isModalOpen = false;
    this.feedbackIdtoDelete = 0;
  }
 
  deleteFeedback() {
    if (this.feedbackIdtoDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackIdtoDelete).subscribe(() => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== this.feedbackIdtoDelete);
        this.closeDeleteModal();
      });
    }
  }
 
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
