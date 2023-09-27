import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss']
})

export class TvShowDetailsComponent implements OnInit {

  public id: number;
  public video: boolean;
  episode: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  related_video: any;
  casts: any;
  backdrop: any;
  _posters: any;
  _recomend: any;
  responsiveOptions;
  loader = true;
  isError = false;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
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
    this.router.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getTvDetails(this.id);
      this.getTvVideos(this.id);
      this.getTvCast(this.id);
      this.getTvBackropsImages(this.id);
      this.getRecomendTv(this.id);
    });
  }

  async getTvDetails(id) {
    this.loader = true;
    this.episode = await new Promise(res => {
      this.tvService.getTVShow(id).subscribe((data: any) => {
        res(data);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

  async getTvVideos(id) {
    this.loader = true;
    const tvVideos: any = await new Promise(res => {
      this.tvService.getTvVideos(id).subscribe((data: any) => {
        res(data);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    })
    if (tvVideos.results.length) {
      this.video = tvVideos.results[0];
      this.related_video = tvVideos.results;
    }
  }

  openDialogTv(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay);
    this.dialog.open(AppTvDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video }
    });
  }

  async getTvCast(id) {
    this.loader = true;
    this.casts = await new Promise(res => {
      this.tvService.getMovieCredits(id).subscribe((data: any) => {
        res(data.cast);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

  async getTvBackropsImages(id) {
    this.loader = true;
    this.backdrop = await new Promise(res => {
      this.tvService.getTvBackdropsImages(id).subscribe((data: any) => {
        res(data.backdrops);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

  async getRecomendTv(id) {
    this.loader = true;
    this._recomend = await new Promise(res => {
      this.tvService.getRecomendTv(id).subscribe((data: any) => {
        res(data.results);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

}
