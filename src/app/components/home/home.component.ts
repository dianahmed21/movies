import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  nowPlaying: any;
  tvShows: any;
  responsiveOptions;
  loader = true;
  isError = false;

  constructor(
    private movies: MoviesService,
    private tv: TvService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  
  ngOnInit() {
    this.trendingMovies(1);
    this.tvShow(1);
  }

  async trendingMovies(page: number) {
  this.nowPlaying = await new Promise(res=>{
    this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((data: any) => {
      res(data.results);
      this.loader = false;
    },err=>{
      this.isError = true;
      this.loader = false;
    });
  });  
  }

  async tvShow(page: number) {
    this.tvShows = await new Promise(res=>{
      this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((data: any) => {
        res(data.results);
        this.loader = false;
      },err=>{
        this.isError = true;
        this.loader = false;
      });
    });
  }
}
