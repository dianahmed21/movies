import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.scss']
})
export class TvGenreComponent implements OnInit {
  _tv: any[] = [];
  title: string;
  public id: number;
  loader = true;
  isError = false;
  page: number = 0;
  infiniteLoader: boolean;
  pageYoffset: number

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute,
    private scroll: ViewportScroller
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getTvByGenre(false);
    });
  }

  async getTvByGenre(isInfinite: boolean) {
    this.page += 1;
    !isInfinite ? this.loader = true : this.infiniteLoader = true;
    const _tv: any = await new Promise(res => {
      this.tvService.getTVShowByGenre(this.id, this.page).subscribe((data: any) => {
        res(data.results);
        !isInfinite ? this.loader = false : this.infiniteLoader = false;
      }, err => {
        this.isError = true;
        !isInfinite ? this.loader = false : this.infiniteLoader = false;
      });
    });
    this._tv.push(..._tv);
    this.favoriteCheck();
  }

  setFavorite(data) {
    const movie: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    movie.push(data);
    localStorage.setItem('tv', JSON.stringify(movie));
    this.favoriteCheck();
  }

  private favoriteCheck() {
    const favoriteData: any[] = JSON.parse(localStorage.getItem('tv'));
    if (favoriteData?.length && this._tv.length) {
      favoriteData.forEach(favorite => {
        this._tv.forEach(tv => {
          if (favorite.id === tv.id) {
            tv.isFavorite = true;
          }
          else {
            tv.isFavorite = false;
          }
        });
      });
    }
  }

  removeFavorite(data) {
    let movie: any[] = !JSON.parse(localStorage.getItem('tv')) ? [] : JSON.parse(localStorage.getItem('tv'));
    movie = movie.filter(x => x.id !== data.id);
    localStorage.setItem('tv', JSON.stringify(movie));
    this._tv.filter(x => x.id === data.id)[0].isFavorite = false;
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
