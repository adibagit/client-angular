import { Component } from '@angular/core';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {

  department: Department = new Department();
  regexPattern: RegExp = /^[a-zA-Z0-9.\s]+$/;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar, 
    private dialogRef: MatDialogRef<AddDepartmentComponent>
  ) { }

  addDept() {
    if (this.validateForm()) {
      this.departmentService.addDepartment(this.department).subscribe({
        next: (res) => {
          this.snackBar.open("Department added successfully.", "OK", { duration: 5000 });
          this.dialogRef.close();
        },
        error: (err) => {
          this.snackBar.open("Failed adding department!", "Dismiss", { duration: 5000 });
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.department.deptname || !this.department.deptdesc) {
      return false;
    }

    if (!this.regexPattern.test(this.department.deptname) || !this.regexPattern.test(this.department.deptdesc)) {
      return false;
    }
    return true;
  }

}
