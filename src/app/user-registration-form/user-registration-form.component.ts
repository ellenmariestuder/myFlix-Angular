import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public MatSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // function for sending form inputs to backend 
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // [[ logic for successful user registration goes here! TBI ]]
      this.dialogRef.close(); //close the modal on success
      console.log(response);
      this.MatSnackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.MatSnackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
