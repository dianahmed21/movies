import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class SliderComponent implements OnInit {
  current = 0;
  movies_data: any;
  tv_shows: any;


  constructor(
    private movieService: MoviesService,
  ) { }

  ngOnInit() {
    this.getnowPlayingMovies(1);
    this.sliderTimer();
  }

  async getnowPlayingMovies(page: number) {
    this.movies_data = await new Promise(res => {
      this.movieService.getNowPlaying(page).pipe(delay(2000)).subscribe((data: any) => {
        res(data.results);
      });
    });
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies_data.length;
    }, 5000);
  }

}
