import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  genreslist: any;
  loader = true;
  isError = false;

  constructor(
    private _movie: MoviesService
  ) { }

  ngOnInit() {
    this.MovieGenre();
  }

  async MovieGenre() {
    this.genreslist = await new Promise(res=>{
      this._movie.getGenres().pipe(delay(2000)).subscribe((data: any) => {
        res(data.genres);
        this.loader = false;
      },err=>{
        this.isError = true;
        this.loader = false;
      });
    })
  }

}
