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
  searchRes: any;
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
    this.getPopularTVShows();
  }

  async getPopularTVShows() {
    this.page += 1;
    this.loader = true;
    const popularTvShows: any = await new Promise(res => {
      this.tvService.getPopularTVShow(this.page).pipe(delay(2000)).subscribe((data: any) => {
        res(data)
        this.loader = false;
      }, error => {
        this.isError = true;
        this.loader = false;
      });
    });
    this.searchRes.push(...popularTvShows.results);
    this.totalResults = popularTvShows.total_results;
  }

  async onScrollDown() {
    this.page += 1;
    this.infiniteLoader = true;
    const popularTvShows: any = await new Promise(res => {
      this.tvService.getPopularTVShow(this.page).pipe(delay(2000)).subscribe((data: any) => {
        res(data)
        this.infiniteLoader = false;
      }, error => {
        this.isError = true;
        this.infiniteLoader = false;
      });
    });
    this.searchRes.push(...popularTvShows.results);
    this.totalResults = popularTvShows.total_results;
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
    }
    else {
      this.page = 1;
      this.getPopularTVShows();
    }
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
