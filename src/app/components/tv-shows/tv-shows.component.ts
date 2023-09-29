import { Component, HostListener, OnInit } from '@angular/core';
import { TvService } from 'src/app/service/tv.service';
import { delay } from 'rxjs/internal/operators/delay';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  topRatedTv: any;
  responsiveOptions;
  loader = true;
  isError = false;
  totalResults: any;
  total_results: any;
  searchRes: any[] = [];
  searchStr: string;
  page: number = 0;
  infiniteLoader: boolean;
  pageYoffset: number

  constructor(
    private tvService: TvService,
    private scroll: ViewportScroller
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
    this.getPopularTVShows(false);
  }

  async getPopularTVShows(isInfinite: boolean) {
    this.page += 1;
    !isInfinite ? this.loader = true : this.infiniteLoader = true;
    const popularTvShows: any = await new Promise(res => {
      this.tvService.getPopularTVShow(this.page).pipe(delay(2000)).subscribe((data: any) => {
        res(data)
        !isInfinite ? this.loader = false : this.infiniteLoader = false;
      }, error => {
        this.isError = true;
        !isInfinite ? this.loader = false : this.infiniteLoader = false;
      });
    });
    this.searchRes.push(...popularTvShows.results);
    this.totalResults = popularTvShows.total_results;
    this.favoriteCheck();
  }

  async searchMovies() {
    if (this.searchStr) {
      this.loader = true;
      this.searchRes = await new Promise(res => {
        this.tvService.searchtv(this.searchStr).subscribe((data: any) => {
          res(data.results);
          this.loader = false;
        }, err => {
          this.isError = true;
          this.loader = false;
        });
      });
      this.favoriteCheck();
    }
    else {
      this.page = 1;
      this.getPopularTVShows(false);
    }
  }

  setFavorite(data) {
    const movie: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    movie.push(data);
    localStorage.setItem('tv', JSON.stringify(movie));
    this.favoriteCheck();
  }

  private favoriteCheck() {
    const favoriteData: any[] = JSON.parse(localStorage.getItem('tv'));
    if (favoriteData?.length && this.searchRes.length) {
      favoriteData.forEach(favorite => {
        const checkSameId = this.searchRes.filter(x => x.id === favorite.id);
        if (checkSameId.length) {
          this.searchRes.filter(x => x.id === favorite.id)[0].isFavorite = true
        }
      });
    }
  }

  removeFavorite(data) {
    let movie: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    movie = movie.filter(x => x.id !== data.id);
    localStorage.setItem('tv', JSON.stringify(movie));
    this.searchRes.filter(x => x.id === data.id)[0].isFavorite = false;
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
