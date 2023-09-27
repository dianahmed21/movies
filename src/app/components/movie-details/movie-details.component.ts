import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AppMovieDialogComponent } from '../movie-details/app-movie-dialog/app-movie-dialog.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  public id: number;
  public video: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  relatedvideo: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];
  responsiveOptions;
  loader = true;
  isError = false;

  constructor(
    private movieService: MoviesService,
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
      this.id = params['id'];
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getCast(this.id);
      this.getBackropsImages(this.id);
      this.getRecomendMovie(this.id);
    });
  }

  async getSingleMoviesDetails(id) {
    this.loader = true;
    this.movie = await new Promise(res => {
      this.movieService.getMovie(id).subscribe((data: any) => {
        res(data);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    })
  }

  async getSingleMoviesVideos(id) {
    this.loader = true;
    const singleMovies: any = await new Promise(res => {
      this.movieService.getMovieVideos(id).subscribe((data: any) => {
        res(data);
        this.loader = false;
      }, error => {
        this.isError = true;
        this.loader = false;
      });
    })
    if (singleMovies.results?.length) {
      this.video = singleMovies.results[0];
      this.relatedvideo = singleMovies.results;
    }
  }

  openDialogMovie(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay);
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video }
    });
  }

  async getCast(id) {
    this.loader = true;
    this.casts = await new Promise(res => {
      this.movieService.getMovieCredits(id).subscribe((data: any) => {
        res(data.cast);
        this.loader = false;
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

  async getBackropsImages(id) {
    this.loader = true;
    this.backdrops = await new Promise(res => {
      this.movieService.getBackdropsImages(id).subscribe((data: any) => {
        res(data.backdrops);
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

  async getRecomendMovie(id) {
    this.loader = true;
    this.recomendMovies = await new Promise(res => {
      this.movieService.getRecomendMovies(id).subscribe((data: any) => {
        res(data.results);
      }, error => {
        this.loader = false;
        this.isError = true;
      });
    });
  }

}

