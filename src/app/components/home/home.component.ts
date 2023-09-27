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
  nowPlaying: any[] = [];
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
    this.loader = true;
    this.nowPlaying = await new Promise(res => {
      this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((data: any) => {
        res(data.results);
        this.loader = false;
      }, err => {
        this.isError = true;
        this.loader = false;
      });
    });
    const favoriteData: any[] = JSON.parse(localStorage.getItem('movie'));
    if (favoriteData?.length && this.nowPlaying.length) {
      favoriteData.forEach(favorite => {
        this.nowPlaying.forEach(movie => {
          if (favorite.id === movie.id) {
            movie.isFavorite = true;
          }
        })
      })
    }
  }

  async tvShow(page: number) {
    this.loader = true;
    this.tvShows = await new Promise(res => {
      this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((data: any) => {
        res(data.results);
        this.loader = false;
      }, err => {
        this.isError = true;
        this.loader = false;
      });
    });
    const favoriteData: any[] = JSON.parse(localStorage.getItem('tv'));
    if (favoriteData?.length && this.tvShows.length) {
      favoriteData.forEach(favorite => {
        this.tvShows.forEach(tv => {
          if (favorite.id === tv.id) {
            tv.isFavorite = true;
          }
        })
      })
    }
  }

  setFavorite(type, data) {
    const movie: any[] = !JSON.parse(localStorage.getItem('movie')) ? [] : JSON.parse(localStorage.getItem('movie'));
    const tv: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    if (type === 'movie') {
      movie.push(data);
      localStorage.setItem('movie', JSON.stringify(movie));
    }
    else if (type === 'tv') {
      tv.push(data);
      localStorage.setItem('tv', JSON.stringify(tv));
    }
    this.ngOnInit();
  }

  removeFavorite(type, data) {
    let movie: any[] = !JSON.parse(localStorage.getItem('movie')) ? [] : JSON.parse(localStorage.getItem('movie'));
    let tv: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    if (type === 'movie' && movie.length) {
      movie = movie.filter(x => x.id !== data.id);
      localStorage.setItem('movie', JSON.stringify(movie));
    }
    else if (type === 'tv' && tv.length) {
      tv = tv.filter(x => x.id !== data.id);
      localStorage.setItem('tv', JSON.stringify(tv));
    }
    this.ngOnInit();
  }
}
