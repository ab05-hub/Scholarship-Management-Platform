import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScholarshipApplication } from 'src/app/models/scholarshipapplication.model';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-requestedscholarship',
  templateUrl: './requestedscholarship.component.html',
  styleUrls: ['./requestedscholarship.component.css']
})
export class RequestedscholarshipComponent {
//   scholarshipApplications : ScholarshipApplication[] = []
//   tempScholarshipApplication : ScholarshipApplication[] = []
//   searchByScholarshipName : string = '';
//   filterByScholarshipStatus : string = '';
//   isProfileModalOpen :boolean =false;
//   isDialogOpen : boolean = false;
//   currentStatus : string = 'Pending'
//   selectedScholarshipApplication : ScholarshipApplication | null = null;
//   statusTracker: { [key: number]: { isApproved: boolean, isRejected: boolean } } = {};
 
//   constructor(private appliedscholarshipService : ScholarshipService, private route : Router) { }
 
//   ngOnInit(): void {
//     this.loadAppliedInvestments();
//   }
 
//   loadAppliedInvestments() {
//     this.appliedscholarshipService.getAllScholarshipApplications().subscribe((data) => {
//       console.log(data)
//       this.scholarshipApplications = data;
//       this.tempScholarshipApplication = data;
//       this.populateStatusTracker();
//     })
//   }
 
//   populateStatusTracker() {
//     this.scholarshipApplications.forEach(app => {
//       this.statusTracker[app.ScholarshipId] = { isApproved: false, isRejected: false };
//     });
//   }
 
//   filterByScholarshipName() {
//     this.tempScholarshipApplication = this.scholarshipApplications.filter(it => 
//         it.Scholarship && it.Scholarship.Name.toLowerCase().includes(this.searchByScholarshipName.toLowerCase())
//     );
// }

 
//   filterByStatus() {
//     if(this.filterByScholarshipStatus === "All") {
//       this.tempScholarshipApplication = this.scholarshipApplications;
//     } else {
//       this.tempScholarshipApplication = this.scholarshipApplications.filter(it => it.ApplicationStatus.toLowerCase().includes(this.filterByScholarshipStatus.toLowerCase()))
//     }
//   }
 
//   openDialogue(scholarshipApplication : ScholarshipApplication) {
//     this.selectedScholarshipApplication = scholarshipApplication;
//     this.isDialogOpen = true;
//   }
 
//   closeDialogue() {
//     this.selectedScholarshipApplication = null;
//     this.isDialogOpen = false;
//   }
 
//   approveScholarship(scholarshipApplication: ScholarshipApplication) {
//     if (scholarshipApplication.ScholarshipApplicationId !== undefined && scholarshipApplication.ScholarshipId !== undefined) {
//         scholarshipApplication.ApplicationStatus = "Approved";
//         this.appliedscholarshipService.updateApplicationStatus(scholarshipApplication.ScholarshipApplicationId, scholarshipApplication).subscribe(() => {
//             this.statusTracker[scholarshipApplication.ScholarshipId].isApproved = true;
//             this.statusTracker[scholarshipApplication.ScholarshipId].isRejected = false;
//         });
//     } else {
//         console.error("ScholarshipApplicationId or ScholarshipId is undefined");
//     }
// }

// rejectScholarship(scholarshipApplication: ScholarshipApplication) {
//   if (scholarshipApplication.ScholarshipApplicationId !== undefined && scholarshipApplication.ScholarshipId !== undefined) {
//       scholarshipApplication.ApplicationStatus = "Rejected";
//       this.appliedscholarshipService.updateApplicationStatus(scholarshipApplication.ScholarshipApplicationId, scholarshipApplication).subscribe(() => {
//           this.statusTracker[scholarshipApplication.ScholarshipId].isRejected = true;
//           this.statusTracker[scholarshipApplication.ScholarshipId].isApproved = false;
//       });
//   } else {
//       console.error("ScholarshipApplicationId or ScholarshipId is undefined");
//   }
// }
scholarshipApplications : ScholarshipApplication[] = []
  tempScholarshipApplication : ScholarshipApplication[] = []
  searchByScholarshipName : string = '';
  filterByScholarshipStatus : string = '';
  isDialogOpen : boolean = false;
  currentStatus : string = 'Pending'
  selectedScholarshipApplication : ScholarshipApplication | null = null;
  statusTracker: { [key: number]: { isApproved: boolean, isRejected: boolean } } = {};
  page?:number;
  isProfileModalOpen: boolean = false;
 
  constructor(private appliedscholarshipService : ScholarshipService, private route : Router) { }
 
  ngOnInit(): void {
    this.loadAppliedInvestments();
  }
 
  loadAppliedInvestments() {
    this.appliedscholarshipService.getAllScholarshipApplications().subscribe((data) => {
      console.log(data)
      this.scholarshipApplications = data;
      this.tempScholarshipApplication = data;
      this.populateStatusTracker();
    })
  }
 
  populateStatusTracker() {
    this.scholarshipApplications.forEach(app => {
      this.statusTracker[app.ScholarshipId] = { isApproved: false, isRejected: false };
    });
  }
 
  filterByScholarshipName() {
        this.tempScholarshipApplication = this.scholarshipApplications.filter(it => 
            it.Scholarship && it.Scholarship.Name.toLowerCase().includes(this.searchByScholarshipName.toLowerCase())
        );
    }
 
  filterByStatus() {
    if(this.filterByScholarshipStatus === "All") {
      this.tempScholarshipApplication = this.scholarshipApplications;
    } else {
      this.tempScholarshipApplication = this.scholarshipApplications.filter(it => it.ApplicationStatus.toLowerCase().includes(this.filterByScholarshipStatus.toLowerCase()))
    }
  }
 
  openDialogue(scholarshipApplication : ScholarshipApplication) {
    this.selectedScholarshipApplication = scholarshipApplication;
    this.isDialogOpen = true;
  }
 
  closeDialogue() {
    this.selectedScholarshipApplication = null;
    this.isDialogOpen = false;
  }

  pageChanged(event: number): void {
    this.page = event;
  }
 
  approveScholarship(scholarshipApplication: ScholarshipApplication) {
        if (scholarshipApplication.ScholarshipApplicationId !== undefined && scholarshipApplication.ScholarshipId !== undefined) {
            scholarshipApplication.ApplicationStatus = "Approved";
            this.appliedscholarshipService.updateApplicationStatus(scholarshipApplication.ScholarshipApplicationId, scholarshipApplication).subscribe(() => {
                this.statusTracker[scholarshipApplication.ScholarshipId].isApproved = true;
                this.statusTracker[scholarshipApplication.ScholarshipId].isRejected = false;
            });
        } else {
            console.error("ScholarshipApplicationId or ScholarshipId is undefined");
        }
     }
 
     rejectScholarship(scholarshipApplication: ScholarshipApplication) {
        if (scholarshipApplication.ScholarshipApplicationId !== undefined && scholarshipApplication.ScholarshipId !== undefined) {
            scholarshipApplication.ApplicationStatus = "Rejected";
            this.appliedscholarshipService.updateApplicationStatus(scholarshipApplication.ScholarshipApplicationId, scholarshipApplication).subscribe(() => {
                this.statusTracker[scholarshipApplication.ScholarshipId].isRejected = true;
                this.statusTracker[scholarshipApplication.ScholarshipId].isApproved = false;
            });
        } else {
            console.error("ScholarshipApplicationId or ScholarshipId is undefined");
        }
      }

}
