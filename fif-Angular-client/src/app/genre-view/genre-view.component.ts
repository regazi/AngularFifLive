import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css']
})
export class GenreViewComponent {
  genre:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGenre();
  }

  getGenre(): void {
    this.genre = this.data.genre;
    }
}
