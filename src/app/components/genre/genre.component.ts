import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  moviesGenre: any;
  title: string;
  public id: number;
  loader = true;
  isError = false;

  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMoviesGenre(this.id);
    });
  }

  async getMoviesGenre(id) {
    this.moviesGenre = await new Promise(res=>{
      this.movieService.getMoviesByGenre(id).pipe(delay(2000)).subscribe((data: any) => {
          res(data.results);
          this.loader = false;
      },err=>{
        this.isError = true;
        this.loader = false;
      });
    })
  }

}
