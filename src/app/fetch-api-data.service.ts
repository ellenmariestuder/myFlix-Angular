import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// declare the api url that will provide data for the client app
const apiUrl = 'https://getmyflix.herokuapp.com/';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  // inject the HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // make the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // user login 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    localStorage.setItem('username', userDetails.Username);
    localStorage.setItem('password', userDetails.Password);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get all movies 
  getAllMovies(): Observable<any> {
    // const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get one movie (by title)
  getOneMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/Title', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get director (by name)
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'Director/:Name', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // get genre (by name)
  getGenre(): Observable<any> {
    return this.http.get(apiUrl + 'Genre/:Name', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get user's favorite movies
  getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + `users/${user}/Movies`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add movie to user's favorites (by movie title)
  addMovieToFavorites(_id: string): Observable<any> {
    return this.http.post(apiUrl + `/users/${user}/Movies/${_id}`, _id, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete movie from user's favorites (by movie title)
  deleteMovieFromFavorites(_id: string): Observable<any> {
    return this.http.get(apiUrl + `users/${user}/Movies/${_id}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get user 
  getUser(): Observable<any> {
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // edit user 
  editUser(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + `users/${user}`, userDetails, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete user 
  deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // extract non-typed response  
  // private extractResponseData(res: Response): any {
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  // handle error function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something went wrong; please try again later.'
    );
  }
}
