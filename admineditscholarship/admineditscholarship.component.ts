import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Scholarship } from 'src/app/models/scholarship.model';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-admineditscholarship',
  templateUrl: './admineditscholarship.component.html',
  styleUrls: ['./admineditscholarship.component.css']
})
export class AdmineditscholarshipComponent {
  scholarship: Scholarship = {
    ScholarshipId: undefined,
    Name: '',
    Description: '',
    EligibilityCriteria: '',
    Amount: 0,
    Deadline: '',
    Category: '',
    NumberOfAwards: 0,
    Sponsor: ''
  };
  existingScholarships: Scholarship[] = [];
  errorMessage: string = '';
  minDate: string | undefined;

  @ViewChild('editScholarshipForm') editScholarshipForm!: NgForm ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scholarshipService: ScholarshipService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.scholarshipService.getScholarshipById(+id).subscribe(data => {
        this.scholarship = data;
      });
    }
    this.scholarshipService.getAllScholarships().subscribe(
      (scholarships: Scholarship[]) => {
        this.existingScholarships = scholarships;
      },
      (error) => {
        console.error('Error fetching scholarships:', error);
      }
    );
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  checkScholarshipExists(name: string): boolean {
    return this.existingScholarships.some(scholarship => 
      scholarship.Name.toLowerCase() === name.toLowerCase() && 
      scholarship.ScholarshipId !== this.scholarship.ScholarshipId
    );
  }

  saveScholarship(): void {
    if (this.editScholarshipForm.valid) {
      if (this.checkScholarshipExists(this.scholarship.Name)) {
        this.showErrorDialog(`${this.scholarship.Name} already exists.`);
      } else {
        this.scholarshipService.updateScholarship(this.scholarship.ScholarshipId!, this.scholarship).subscribe(
          () => {
            console.log('Scholarship updated successfully');
            this.editScholarshipForm.resetForm();
            this.showSuccessDialog();
          },
          error => {
            console.error('Error updating scholarship:', error);
            this.errorMessage = 'Error updating scholarship.';
          }
        );
      }
    } else {
      this.editScholarshipForm.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/viewscholarship']);
  }

  showSuccessDialog(): void {
    const dialog = document.getElementById('successDialog');
    if (dialog) {
      dialog.style.display = 'block';
    }
  }

  showErrorDialog(message: string): void {
    const dialog = document.getElementById('errorDialog');
    if (dialog) {
      dialog.querySelector('.error-message')!.textContent = message;
      dialog.style.display = 'block';
    }
  }

  closeDialog(dialogId: string): void {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
      dialog.style.display = 'none';
      if (dialogId === 'successDialog') {
        this.router.navigate(['/viewscholarship']);
      }
    }
  }
}
