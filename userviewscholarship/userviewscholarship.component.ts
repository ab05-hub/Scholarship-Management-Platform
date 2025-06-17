import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Scholarship } from 'src/app/models/scholarship.model';
import { ScholarshipApplication } from 'src/app/models/scholarshipapplication.model';
import { AuthService } from 'src/app/services/auth.service';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-userviewscholarship',
  templateUrl: './userviewscholarship.component.html',
  styleUrls: ['./userviewscholarship.component.css']
})
export class UserviewscholarshipComponent implements OnInit {

  scholarships: Scholarship[] = [];
  filteredScholarships: any[] = [];
  searchQuery: string = '';
  appliedScholarships: number[] = [];
  userId!: number; // Replace with the actual user ID
  page: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page

  constructor(private scholarshipService: ScholarshipService, private router: Router, private as: AuthService) { }

  ngOnInit(): void {
    this.getInvestments();
    this.userId = this.as.getUserId();
  }

  getInvestments(): void {
    this.scholarshipService.getAllScholarships().subscribe((data) => {
      this.scholarships = data;
      this.filteredScholarships = data;
      this.getUserAppliedScholarships();
    });
  }

  getUserAppliedScholarships(): void {
    this.scholarshipService.getAllScholarshipApplications().subscribe((data: ScholarshipApplication[]) => {
      this.appliedScholarships = data
        .filter(app => app.UserId === this.userId)
        .map(app => app.ScholarshipId);
      console.log(this.appliedScholarships);
    });
  }

  searchScholarship(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredScholarships = this.scholarships;
    } else {
      this.filteredScholarships = this.scholarships.filter(scholarship =>
        scholarship.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  isApplied(scholarshipId: number): boolean {
    return this.appliedScholarships.includes(scholarshipId);
  }
}
