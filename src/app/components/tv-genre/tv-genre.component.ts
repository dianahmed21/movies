import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})
export class TvGenreComponent implements OnInit {

  _tv: Object;
  title: string;
  public id: number;
  loader = true;
  isError = false;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getTvByGenre(this.id);
    });
  }

  async getTvByGenre(id) {
    this.loader = true;
    this._tv = await new Promise(res => {
      this.tvService.getTVShowByGenre(id).subscribe((data: any) => {
        res(data.results);
        this.loader = false;
      }, err => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

}
