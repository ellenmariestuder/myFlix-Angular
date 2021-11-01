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
    // this.getMovies();
    // this.getFavorites();
    // this.userFavs = this.movies.filter(
    //   movies => movies._id===this.user.FavoriteMovies.0);
    //   console.log('user favorite movies: ', this.userFavs);
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log('get user: ', this.user);
      return this.user;
      // this.getFavorites();
    });
  }

  openUpdateUserDialog(): void {
    this.dialog.open(UpdateUserFormComponent, {
      width: '300px'
    });
  }

  // getFavorites(): void {
  //   this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
  //     this.userFavs = resp;
  //     console.log('fav movies: ', this.userFavs);
  //     return this.userFavs;
  //   }) 
  // }

  // getFavorites(): void {
  //   this.fetchApiData.getAllMovies().subscribe((resp: any) => {
  //     this.movies = resp;
  //     this.filterFavorites();
  //     // return this.movies;
  //   })
  // }

  // filterFavorites(): void {
  //   console.log('user favorite movies: ', this.user.FavoriteMovies);
  //   this.userFavs = this.movies.filter((movie: any) =>
  //     this.user.FavoriteMovies.includes(movie._id));
  //   return this.userFavs;
  // }

  removeFromFavs(): void {
    this.fetchApiData.deleteMovieFromFavorites(this.user.FavoriteMovies._id).subscribe(() => {
      this.snackBar.open('Movie removed from favorites.', "OK", {
        duration: 3000
      });
    })
  }

  deleteUser(): void {
    console.log('about to delete user');
    this.fetchApiData.deleteUser().subscribe(() => {
      console.log(this.user, 'was deleted');
    });
    // localStorage.clear();
    // this.router.navigate(['welcome']);
  }
  
  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  formatDate(Birthday: string) {
    return formatDate(Birthday, 'MM/dd/yyyy', 'en-US');
  }

}
