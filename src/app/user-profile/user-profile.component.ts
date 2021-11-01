import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserFormComponent } from '../update-user-form/update-user-form.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = {};
  userFavs: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log('get user: ', this.user);
      this.getFavorites();
    });
  }

  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserFormComponent, {
      width: '300px'
    });
  }

  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    console.log('user favorite movies: ', this.user.FavoriteMovies);
    this.userFavs = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id));
    return this.userFavs;
  }

  removeFromFavs(_id: string): void {
    this.fetchApiData.deleteMovieFromFavorites(_id).subscribe(() => {
      this.snackBar.open('Movie has been removed from favorites.', "OK", {
        duration: 3000
      });
      return this.getUser();
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure? This can\'t be undone.')) {
      console.log('delete User before');
      this.fetchApiData.deleteUser().subscribe(() => {
        console.log('delete user after')
        this.snackBar.open('User successfully deleted.', "OK", {
          duration: 3000
        });
      }, (response => {
        console.log(response);
        this.snackBar.open(response, 'OK', {duration: 2000});
        localStorage.clear();
        this.router.navigate(['welcome'])
        // .then(() => {window.location.reload();});
      })
      );
    }
  }

  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  formatDate(birthday: string) {
    return formatDate(birthday, 'MM/dd/yyyy', 'en-US');
  }

}
