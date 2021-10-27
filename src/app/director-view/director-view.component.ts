import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
// export class DirectorViewComponent implements OnInit {
export class DirectorViewComponent {
  director: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getDirector();
  }

  getDirector(): void {
    this.fetchApiData.getDirector().subscribe((resp: any) => {
      this.director = resp;
      console.log(this.director);
      return this.director;
    });
  }

}
