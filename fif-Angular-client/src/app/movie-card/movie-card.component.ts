// src/app/movie-card/movie-card.component.ts
import { Component, HostListener } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  user:any;
  style:string ='container';
  isMobile: boolean = false;
  movies: any[] = [];
  directors: any[] = [];
  genres: any[] = [];
  favorites: any[]=[];
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

ngOnInit(): void {
  this.getMovies();
  this.getDirectors();
  this.getGenres();
  this.adjustStyle()
}
@HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustStyle();
  }

  private adjustStyle(): void {
    this.isMobile = window.innerWidth < 800;
    if(this.isMobile){
      this.style = 'containerMobile'
    }else{
      this.style='container'
    }
  }

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

getFavorites(){
  const lsUser = localStorage.getItem('user')??'';
  this.user = JSON.parse(lsUser);
  const favorites = Array.from(this.user.favoriteMovies);
  this.favorites = this.movies.filter((movie) => favorites.includes(movie._id));
  return this.favorites;
}
getDirectors(): void {
  this.fetchApiData.getAllDirectors().subscribe((resp: any) => {
      this.directors = resp;
      return this.directors;
    });
  }
getGenres(): void {
  this.fetchApiData.getAllGenres().subscribe((resp: any) => {
      this.genres = resp;
      return this.genres;
    });
  }
addToFavorites(movieId:string): void{
  this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {
  localStorage.setItem('user', JSON.stringify(resp))
  });
}
removeFromFavorites(movieId:string): void{
  this.fetchApiData.removeFromFavorites(movieId).subscribe((resp: any) => {
    localStorage.setItem('user', JSON.stringify(resp))
    });
}
//#region Open Dialog Methods
openMovieViewDialog(movie: any): void {
    this.dialog.open(MovieViewComponent, {
  // Assigning the dialog a width
    width: this.isMobile? '100%':'auto',
    height: 'auto',
    maxHeight: '95vh',
    data: {movieData: movie,
          director: this.findDirector(movie.director),
          genre: this.findGenre(movie.genre),
          isMobile: this.isMobile}
   });
  }

  //#endregion
  toggleFavorite(movieId:string): void{
    if(this.isFavorite(movieId)){
      this.removeFromFavorites(movieId);
    }else{
      this.addToFavorites(movieId)
    }
  } 
  //#region helper methods
  findDirector(directorId:string){
    return this.directors.find((director)=> director.id = directorId);
  }
  findGenre(genreId:string){
    return this.genres.find((genre)=> genre.id = genreId);
  }
  isFavorite(id:string):boolean{
    const hasMovie = this.favorites.find((movie) => movie._id === id);
    if(hasMovie){
      return true
    }
    return false
  }
  //#endregion
}

