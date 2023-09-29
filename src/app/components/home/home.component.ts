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
    this.favoriteCheck();
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
    this.favoriteCheck();
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
    this.favoriteCheck();
  }

  private favoriteCheck() {
    const favoriteMovie: any[] = JSON.parse(localStorage.getItem('movie'));
    if (favoriteMovie?.length && this.nowPlaying.length) {
      favoriteMovie.forEach(favorite => {
        const checkSameId = this.nowPlaying.filter(x => x.id === favorite.id);
        if (checkSameId.length) {
          this.nowPlaying.filter(x => x.id === favorite.id)[0].isFavorite = true
        }
      });
    }
    const favoriteTv: any[] = JSON.parse(localStorage.getItem('tv'));
    if (favoriteTv?.length && this.tvShows.length) {
      favoriteTv.forEach(favorite => {
        const checkSameId = this.tvShows.filter(x => x.id === favorite.id);
        if (checkSameId.length) {
          this.tvShows.filter(x => x.id === favorite.id)[0].isFavorite = true
        }
      });
    }
  }

  removeFavorite(type, data) {
    let movie: any[] = !JSON.parse(localStorage.getItem('movie')) ? [] : JSON.parse(localStorage.getItem('movie'));
    let tv: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    if (type === 'movie' && movie.length) {
      movie = movie.filter(x => x.id !== data.id);
      localStorage.setItem('movie', JSON.stringify(movie));
      this.nowPlaying.filter(x => x.id === data.id)[0].isFavorite = false;
    }
    else if (type === 'tv' && tv.length) {
      tv = tv.filter(x => x.id !== data.id);
      localStorage.setItem('tv', JSON.stringify(tv));
      this.tvShows.filter(x => x.id === data.id)[0].isFavorite = false;
    }
  }
}
