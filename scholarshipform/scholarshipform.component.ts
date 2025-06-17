import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-scholarshipform',
  templateUrl: './scholarshipform.component.html',
  styleUrls: ['./scholarshipform.component.css']
})
export class ScholarshipformComponent {
  scholarshipApplicationForm!: FormGroup;
  isDialogOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private scholarshipService: ScholarshipService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.scholarshipApplicationForm = this.fb.group({
      UserId: [0],
      ScholarshipId: [0],
      ApplicationStatus: ['Pending'],
      ApplicationDate: [new Date().toISOString()],
      Essay: ['', Validators.required],
      Remarks: ['', Validators.required],
      SupportingDocuments: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe((params) => {
      this.scholarshipApplicationForm.patchValue({
        ScholarshipId: +params['id'],
        UserId: this.authService.getUserId()
      });
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    const fileNames = Array.from(files).map((file: unknown) => (file as File).name);
    this.scholarshipApplicationForm.patchValue({
        SupportingDocuments: fileNames.join(', ')
    });
}


  applyForScholarship() {
    if (this.scholarshipApplicationForm.valid) {
      this.scholarshipService.addScholarshipApplication(this.scholarshipApplicationForm.value).subscribe(() => {
        console.log("data");
        this.scholarshipApplicationForm.reset();
        this.openDialog();
      });
    }
  }

  openDialog() {
    console.log("opened");
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.router.navigate(['/userviewscholarship']);
  }
}
