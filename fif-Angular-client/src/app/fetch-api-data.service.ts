import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

const _api = 'https://fifilm.herokuapp.com/';
const _googleApi = '';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { 
  }
  public getMap(){
    const res =this.http.jsonp(_googleApi + 'movies', 'callback').pipe(
      map(() => true),
      catchError(() => of(false)),
    );
    (res);
    return res;
  }
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${_api}users`, userDetails).pipe(
    catchError(this.handleError)
    );
  }
  public updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${_api}users/${userDetails._id}`, userDetails,{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
    catchError(this.handleError)
    );
  }
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(_api + 'login?', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(_api + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  getMoviesByDirector(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(_api + `movies/director/${id}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(_api + `directors`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(_api + `genres`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  removeFromFavorites(movieId:string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ?? "";
    const userId = JSON.parse(user)._id;
    (userId);
    return this.http.delete(_api + `users/${userId}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  addToFavorites(movieId:string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') ?? "";
    const userId = JSON.parse(user)._id;
    return this.http.post(_api + `users/${userId.trim()}/movies/${movieId.trim()}`,{}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
//made both any to avoid type error
  private extractResponseData(res: any): any {
    const body = res;
    (body);
    return body || { };
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError( () => new Error('Something bad happened; please try again later.'));
  }
}
