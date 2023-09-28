import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  public moviesGenre: any[] = [];
  title: string;
  public id: number;
  loader = true;
  isError = false;
  infiniteLoader: boolean;
  page: number = 0;
  pageYoffset: number

  constructor(
    private movieService: MoviesService,
    private scroll: ViewportScroller,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getMoviesGenre(false);
    });
  }

  async getMoviesGenre(isInfinite: boolean) {
    this.page += 1;
    !isInfinite ? this.loader = true : this.infiniteLoader = true;
    const moviesGenre: any = await new Promise(res => {
      this.movieService.getMoviesByGenre(this.id, this.page).pipe(delay(2000)).subscribe((data: any) => {
        res(data.results);
        !isInfinite ? this.loader = false : this.infiniteLoader = false;
      }, err => {
        this.isError = true;
        !isInfinite ? this.loader = false : this.infiniteLoader = false;
      });
    });
    this.moviesGenre.push(...moviesGenre);
    this.favoriteCheck();
  }

  setFavorite(data) {
    const movie: any[] = !JSON.parse(localStorage.getItem('movie')) ? [] : JSON.parse(localStorage.getItem('movie'));
    movie.push(data);
    localStorage.setItem('movie', JSON.stringify(movie));
    this.favoriteCheck();
  }

  private favoriteCheck() {
    const favoriteData: any[] = JSON.parse(localStorage.getItem('movie'));
    if (favoriteData?.length && this.moviesGenre.length) {
      favoriteData.forEach(favorite => {
        this.moviesGenre.forEach(movie => {
          if (favorite.id === movie.id) {
            movie.isFavorite = true;
          }
          else {
            movie.isFavorite = false;
          }
        });
      });
    }
  }

  removeFavorite(data) {
    let movie: any[] = !JSON.parse(localStorage.getItem('movie')) ? [] : JSON.parse(localStorage.getItem('movie'));
    movie = movie.filter(x => x.id !== data.id);
    localStorage.setItem('movie', JSON.stringify(movie));
    this.moviesGenre.filter(x => x.id === data.id)[0].isFavorite = false;
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset
    var mybutton = document.getElementById('myBtn')
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = 'block'
    } else {
      mybutton.style.display = 'none'
    }
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0])
  }

}
