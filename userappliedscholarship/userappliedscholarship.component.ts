import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScholarshipApplication } from 'src/app/models/scholarshipapplication.model';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-userappliedscholarship',
  templateUrl: './userappliedscholarship.component.html',
  styleUrls: ['./userappliedscholarship.component.css']
})
export class UserappliedscholarshipComponent {
  investments: ScholarshipApplication[] = [];
  filteredScholarships: any[] = [];
  searchQuery: string = '';
  deleteId: number | null = null;
  isDialogOpen : boolean = false;
  selectedScholarshipApplication : ScholarshipApplication | null = null;

  constructor(private scholarshipService: ScholarshipService,private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.getScholarships();
  }

  getScholarships(): void {
    this.scholarshipService.getAllScholarshipApplications().subscribe((data: any[]) => {
      this.investments = data;
      this.filteredScholarships = data;
      // console.log(data);
    });
  }

  searchScholarships(): void {
    if (this.searchQuery.trim() === '') {
        this.filteredScholarships = this.investments;
    } else {
        this.filteredScholarships = this.investments.filter(investment => 
            investment.Scholarship && investment.Scholarship.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
}


  openDialog(investmentApplication : ScholarshipApplication) {
    console.log(investmentApplication);
    this.selectedScholarshipApplication = investmentApplication
    console.log(this.selectedScholarshipApplication);
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.selectedScholarshipApplication = null;
  }

  confirmDelete(): void {
    if (this.selectedScholarshipApplication && this.selectedScholarshipApplication.ScholarshipApplicationId !== undefined) {
        console.log(this.selectedScholarshipApplication.ScholarshipApplicationId);
        this.scholarshipService.deleteScholarshipApplication(this.selectedScholarshipApplication.ScholarshipApplicationId).subscribe(() => {
            this.getScholarships();
            this.closeDialog();
        });
    } else {
        console.error("selectedScholarshipApplication or ScholarshipApplicationId is undefined");
    }
  }

  // cancelDelete():void{
  //   this.router.navigate(['/']);
  // }
}
