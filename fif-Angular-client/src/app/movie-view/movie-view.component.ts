import { Component, Inject, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';


@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent {
  isMobile:boolean;
  style:string;
  movie: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialog: MatDialog) {
    this.isMobile = this.data.isMobile || window.innerWidth < 800;
    console.log(this.isMobile)
    this.style = this.adjustStyle();
  }
  
  ngOnInit(): void {
    this.getMovie();
    
  }
    @HostListener('window:resize', ['$event'])
    onResize(event: Event): void {
    this.adjustStyle();
    }
  adjustStyle(): string{
    if(this.isMobile){
      this.style = 'mobile-card';
    }else{
      this.style='card';
    }
    return this.style;
  }
    getMovie(): void {
      this.movie = this.data.movieData;
      this.movie.filmingLocations = this.getAllMarkers(this.movie);
      this.movie.director = this.data.director;
      this.movie.genre = this.data.genre;
    }
    getAllMarkers(movie:any): Array<any>{
      const locations: any[] =[];
      this.movie.filmingLocations.forEach((city:any)=>{
        console.log(city);
      const latLong={lat:0, lng:0, title: city.name, label:''}
      city.locations.forEach((location:any) => {
        latLong.label = location.name;
        latLong.lat = parseFloat(location.location[0]);
        latLong.lng = parseFloat(location.location[1]);
      });
      locations.push(latLong);
      })
      console.log(locations);
      return locations;
    }
    openDirectorViewDialog(director:any): void {
      this.dialog.open(DirectorViewComponent, {
      width: '280px',
      data: {director: director}
     });
    }
    openGenreViewDialog(genre:any): void {
      this.dialog.open(GenreViewComponent, {
      width: '280px',
      data: {genre: genre}
     });
    }
}
