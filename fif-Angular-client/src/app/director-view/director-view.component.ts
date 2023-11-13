import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.css']
})
export class DirectorViewComponent {
  director:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDirector();
  }

  getDirector(): void {
    this.director = this.data.director;
    }
}
