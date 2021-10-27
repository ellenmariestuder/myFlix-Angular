import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})

// export class GenreViewComponent implements OnInit {
export class GenreViewComponent {  
  genres: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    });
  }
}
