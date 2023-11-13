import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FormUtilsService } from '../form-utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css']
})
export class AccountModalComponent {
  user: any;
  isEditing = false;
  editingField: string = '';
  errorMessage:string = '';
  errorClass:string = '';

  constructor(public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  public formUtils: FormUtilsService,
  public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.user.password = "********"
    console.log(this.user);
  }
  editField(field: string): void {
    if (!this.isEditing) {
      this.isEditing = true;
      this.editingField = field;
    }
  }
  saveChanges(): void {
    const error = this.formUtils.validate(this.editingField, this.user[this.editingField])
    if(error){
      this.errorClass = "error"
      this.errorMessage = error;
      return;
    }
    this.fetchApiData.updateUser(this.user).subscribe((result ) => {
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result));
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
    this.errorClass = ""
    this.errorMessage = "";
    this.isEditing = false;
    this.editingField = '';
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.editingField = '';
  }
}
