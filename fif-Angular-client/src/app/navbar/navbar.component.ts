import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoritesModalComponent } from '../favorites-modal/favorites-modal.component';
import { Router } from '@angular/router';
import { AccountModalComponent } from '../account-modal/account-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() favoriteMovies: any[]=[];
  @Input() user: any;
  constructor(public dialog: MatDialog, private router: Router) { }
  
  openFavoritesDialog(): void {
    this.dialog.open(FavoritesModalComponent, {
    width: '280px',
    position: { top: '7vh', right: '0'},
    data: {favorites: this.favoriteMovies}
   });
  }
  openAccountDialog(): void {
    this.dialog.open(AccountModalComponent, {
    height: 'auto',
    maxHeight: '95vh',
    position: { top: '7vh', right: '0'},
    data: {user: this.user }
    });
  }
  logout():void{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/']);
  }
}
