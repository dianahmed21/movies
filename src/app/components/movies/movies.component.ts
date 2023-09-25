import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  responsiveOptions;
  loader = true;
  isError = false;
  totalResults: any;
  total_results: any;
  searchRes: any[] = [];
  searchStr: string;

  constructor(private movieService: MoviesService) {
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
    this.getTopRatedMovies(1);
  }

  async getTopRatedMovies(page: number) {
    this.loader = true;
    const topRatedData:any = await new Promise(res=>{
      this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((data: any) => {
        res(data)
        this.loader = false;
      },error => {
        this.isError = true;
        this.loader = false;
      });
    });
    this.searchRes = topRatedData.results;
    this.totalResults = topRatedData.total_results;
  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }

  async searchMovies() {
    if(this.searchStr){
      this.loader = true;
      this.searchRes = await new Promise(res=>{
        this.movieService.searchMovies(this.searchStr).subscribe((data:any) => {
          res(data.results);
          this.loader = false;
        },err=>{
          this.isError = true;
          this.loader = false;
        });
      });
    }
    else{
    this.getTopRatedMovies(1);
    }
  }


}
