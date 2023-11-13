import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.css']
})
export class FavoritesModalComponent {
  favorites: any[] =[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void{
    this.favorites = this.data.favorites;
  }
}
