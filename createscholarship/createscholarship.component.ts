import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Scholarship } from 'src/app/models/scholarship.model';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-createscholarship',
  templateUrl: './createscholarship.component.html',
  styleUrls: ['./createscholarship.component.css']
})
export class CreatescholarshipComponent {
  newScholarship: Scholarship = {
    ScholarshipId: 0,
    Name: '',
    Description: '',
    EligibilityCriteria: '',
    Deadline: '',
    Category: '',
    NumberOfAwards: 0,
    Amount: 0,
    Sponsor: ''
  };

  existingScholarships: Scholarship[] = []; // Array to store existing scholarships
  errorMessage: string = '';
  minDate: string | undefined;

  @ViewChild('scholarshipForm') scholarshipForm!: NgForm;

  constructor(
    public scholarshipService: ScholarshipService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Fetch existing scholarships from the server on component load
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
    return this.existingScholarships.some(scholarship => scholarship.Name.toLowerCase() === name.toLowerCase());
  }

  addScholarship() {
    if (this.scholarshipForm.valid) {
      if (this.checkScholarshipExists(this.newScholarship.Name)) {
        this.showErrorDialog(`${this.newScholarship.Name} already exists.`);
      } else {
        this.scholarshipService.addScholarship(this.newScholarship).subscribe(
          () => {
            console.log("Scholarship added successfully");
            this.scholarshipForm.resetForm();
            this.showSuccessDialog();
          });
      }
    } else {
      this.scholarshipForm.control.markAllAsTouched(); // Mark all fields as touched to trigger validation
    }
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
