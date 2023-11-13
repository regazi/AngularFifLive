import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {  FetchApiDataService } from '../fetch-api-data.service';
import {  FormUtilsService } from '../form-utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = {
  username: string;
  password: string;
  email: string;
  birthday: string;
  [key: string]: string; 
};
type ValidationError = {
  field: string;
  error: string;
  [key: string]: string; 
};
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent {
  @Input() userData:User = { username: '', password: '', email: '', birthday: '' };
  errors: Array<ValidationError> =[];
  errorMessage: string ="";
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar,
      private router: Router,
      public formUtilsService: FormUtilsService) { }
  
  ngOnInit(): void {
  }
  
  registerUser(): void {
    for (let key in this.userData) {
      if (this.userData.hasOwnProperty(key)) {
       var res = this.formUtilsService.validate(key, this.userData[key]);
       if(res){
        this.errors.push({field: key, error: res});
       }
      }
    }
    if(this.errors.length>0){
      this.errors.forEach((error)=> this.errorMessage += `${error.error} `)
      return;
    }
      this.fetchApiData.userRegistration(this.userData).subscribe((result ) => {
        localStorage.setItem('user', JSON.stringify(result));
        this.logIn();
       this.dialogRef.close(); // This will close the modal on success!
      });
      
    }
    logIn(){
        this.fetchApiData.userLogin({username: this.userData.username, password: this.userData.password}).subscribe((result) => {
          localStorage.setItem('token', result.token);
          this.router.navigate(['movies']);
          this.snackBar.open('Logged in', 'OK', {
            duration: 2000
          });
        }, (result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000
          });
        });
    }
}
