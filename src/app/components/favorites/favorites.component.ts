import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  responsiveOptions;
  loader = true;
  isError = false;
  totalResults: any;
  total_results: any;
  movieData: any[] = [];
  movieDataFilter: any[] = [];
  tvData: any[] = [];
  tvDataFilter: any[] = [];
  page: number = 0;
  infiniteLoader: boolean;
  pageYoffset: number

  constructor(
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
    this.getFavorites();
  }

  getFavorites() {
    this.movieData = JSON.parse(localStorage.getItem('movie'));
    this.movieDataFilter = this.movieData;
    this.tvData = JSON.parse(localStorage.getItem('tv'));
    this.tvDataFilter = this.tvData;
    setTimeout(() => {
      this.loader = false
    }, 1500);
  }

  removeFavorite(type, data) {
    if (type === 'movie' && this.movieData.length) {
      this.movieData = this.movieData.filter(x => x.id !== data.id);
      localStorage.setItem('movie', JSON.stringify(this.movieData));
    }
    else if (type === 'tv' && this.tvData.length) {
      this.tvData = this.tvData.filter(x => x.id !== data.id);
      localStorage.setItem('tv', JSON.stringify(this.tvData));
    }
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
    }, 1500);
  }

  searchMovies(event) {
    if (this.movieDataFilter.length) {
      const text = event.target.value.toLowerCase();
      this.movieData = this.movieDataFilter.filter((item: any) => item.title.toLowerCase().indexOf(text) !== -1);
    }
  }

  searchTvShows(event) {
    if (this.tvDataFilter.length) {
      const text = event.target.value.toLowerCase();
      this.tvData = this.tvDataFilter.filter((item: any) => item.name.toLowerCase().indexOf(text) !== -1);
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
