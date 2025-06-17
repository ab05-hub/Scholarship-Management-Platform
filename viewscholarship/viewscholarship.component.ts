import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Scholarship } from 'src/app/models/scholarship.model';
import { ScholarshipService } from 'src/app/services/scholarship.service';

@Component({
  selector: 'app-viewscholarship',
  templateUrl: './viewscholarship.component.html',
  styleUrls: ['./viewscholarship.component.css']
})
export class ViewscholarshipComponent {
  // scholarships: Scholarship[] = [];
  // searchTerm: string = '';
  // isDialogueOpen: boolean = false;
  // selectedScholarship: Scholarship | null = null;
  // popupMessage: string = '';
  // isSuccess: boolean = true; // Add this property
 
  // constructor(private scholarshipService: ScholarshipService, private router: Router) { }
 
  // ngOnInit(): void {
  //   this.loadScholarships();
  // }
 
  // loadScholarships(): void {
  //   this.scholarshipService.getAllScholarships().subscribe((data) => {
  //     console.log('Scholarships loaded:', data);
  //     this.scholarships = data;
  //   }, error => {
  //     console.error('Error loading scholarships:', error);
  //   });
  // }
 
  // filteredScholarships(): Scholarship[] {
  //   return this.scholarships.filter(sch =>
  //     sch.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //     sch.Description.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
 
  // editScholarship(scholarship: Scholarship): void {
  //   this.router.navigate(['/admineditscholarship', scholarship.ScholarshipId]);
  // }
  
  // openDialogue(scholarship: Scholarship): void {
  //   this.selectedScholarship = scholarship;
  //   this.isDialogueOpen = true;
  // }
 
  // closeDialogue(): void {
  //   this.isDialogueOpen = false;
  //   this.selectedScholarship = null;
  // }
 
  // deleteScholarship(): void {
  //   if (this.selectedScholarship) {
  //     this.scholarshipService.deleteScholarship(this.selectedScholarship.ScholarshipId!).subscribe({
  //       next: () => {
  //         this.loadScholarships(); // Refresh table
  //         this.closeDialogue();
  //         this.showPopupMessage("Scholarship deleted successfully.", true);
  //       },
  //       error: (error) => {
  //         const errorMessage = error?.error?.message || error?.error;
  //         if (typeof errorMessage === 'string' && errorMessage.includes("Scholarship cannot be deleted")) {
  //           this.showPopupMessage("Scholarship cannot be deleted! It is referenced in scholarship applications.", false);
  //         } else {
  //           console.error("Error deleting scholarship:", error);
  //           this.showPopupMessage("An error occurred while deleting the scholarship.", false);
  //         }
  //       }
  //     });
  //   }
  // }
 
  // showPopupMessage(message: string, success: boolean): void {
  //   this.popupMessage = message;
  //   this.isSuccess = success; // Determine message color based on success or error
  //   setTimeout(() => {
  //     this.popupMessage = "";
  //   }, 3000); // Auto-hide message after 3 seconds
  // }
  scholarships: Scholarship[] = [];
  
  searchTerm: string = '';
  filteredScholarship: Scholarship[] = [];
  isDialogueOpen: boolean = false;
  selectedScholarship: Scholarship | null = null;
  popupMessage: string = '';
  isSuccess: boolean = true; // Add this property
  sortField: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  page:number=1;
  applicationCounts: { [key: number]: number } = {}; // Add this property

  constructor(private scholarshipService: ScholarshipService, private router: Router) { }

  ngOnInit(): void {
    this.loadScholarships();
  }

  loadScholarships(): void {
    this.scholarshipService.getAllScholarships().subscribe((data) => {
      console.log('Scholarships loaded:', data);
      this.scholarships = data.map(scholarship => {
        if (scholarship.Deadline) {
          scholarship.Deadline = this.formatDate(scholarship.Deadline);
        }
        return scholarship;
      });
      this.filteredScholarship = this.scholarships;
      this.loadApplicationCounts();
    }, error => {
      console.error('Error loading scholarships:', error);
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }

  loadApplicationCounts(): void {
    this.scholarships.forEach((scholarship: Scholarship) => {
      const scholarshipId = scholarship.ScholarshipId;
      if (scholarshipId !== undefined) {
        this.scholarshipService.getApplicationCountForScholarship(scholarshipId).subscribe(count => {
          this.applicationCounts[scholarshipId] = count;
          console.log(`Scholarship ID: ${scholarshipId}, Count: ${count}`);
        }, error => {
          console.error(`Error loading application count for scholarship ID ${scholarshipId}:`, error);
        });
      } else {
        console.warn(`Scholarship ID is undefined for one of the scholarships.`);
      }
    });
    console.log('Application Counts:', this.applicationCounts); // Debugging
  }
  
  
  

  pageChanged(event: number): void {
    this.page = event;
  }

  sortScholarships(field: string): void {
    
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

  }

  filteredScholarships(): Scholarship[] {
    this.filteredScholarship = this.scholarships.filter(sch =>
      sch.Name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      sch.Description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  
    this.filteredScholarship.sort((a, b) => {
      const fieldA = a[this.sortField as keyof Scholarship];
      const fieldB = b[this.sortField as keyof Scholarship];
      if (fieldA === undefined || fieldB === undefined) {
        return 0; // Handle undefined fields
      }
      if (fieldA < fieldB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    return this.filteredScholarship;
  }

  editScholarship(scholarship: Scholarship): void {
    this.router.navigate(['/admineditscholarship', scholarship.ScholarshipId]);
  }

  openDialogue(scholarship: Scholarship): void {
    this.selectedScholarship = scholarship;
    this.isDialogueOpen = true;
  }

  closeDialogue(): void {
    this.isDialogueOpen = false;
    this.selectedScholarship = null;
  }

  deleteScholarship(): void {
    if (this.selectedScholarship) {
      this.scholarshipService.deleteScholarship(this.selectedScholarship.ScholarshipId!).subscribe({
        next: () => {
          this.loadScholarships(); // Refresh table
          this.closeDialogue();
          this.showPopupMessage("Scholarship deleted successfully.", true);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || error?.error;
          if (typeof errorMessage === 'string' && errorMessage.includes("Scholarship cannot be deleted")) {
            this.showPopupMessage("Scholarship cannot be deleted! It is applied by a user.", false);
          } else {
            console.error("Error deleting scholarship:", error);
            this.showPopupMessage("An error occurred while deleting the scholarship.", false);
          }
        }
      });
    }
  }

  showPopupMessage(message: string, success: boolean): void {
    this.popupMessage = message;
    this.isSuccess = success; // Determine message color based on success or error
    setTimeout(() => {
      this.popupMessage = "";
    }, 3000); // Auto-hide message after 3 seconds
  }
  
}
