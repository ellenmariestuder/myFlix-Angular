import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
// export class SynopsisViewComponent implements OnInit {
export class SynopsisViewComponent {
  synopsis: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getOneMovie();
  }

  getOneMovie(): void {
    this.fetchApiData.getOneMovie().subscribe((resp: any) => {
      this.synopsis = resp;
      console.log(this.synopsis);
      return this.synopsis;
    });
  }

}
