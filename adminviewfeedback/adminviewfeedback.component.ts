import { Component } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent {
  feedbacks : Feedback[] = []
  selectedUser:any
  isProfileModalOpen:boolean=false
 
  constructor(private feedbackService : FeedbackService) { }
 
  ngOnInit(): void {
    this.loadFeedbacks();
  }
 
  loadFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((data) => {
      this.feedbacks = data;
    })
  }
 
  showProfile(user : any) {
    this.selectedUser=user;
    this.isProfileModalOpen=true;
  }
 
  closeProfileModal() {
    this.isProfileModalOpen=false;
    this.selectedUser=null;
  }
}
