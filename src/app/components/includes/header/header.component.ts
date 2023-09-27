import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  language:string;
  searchBarUp;
  leftSidebar;
  isShow:boolean = true;

  constructor(
    private router:Router,
    private tvService:TvService,
    private movieService:MoviesService
    ) { 
      this.language = this.movieService.language;
    }

  ngOnInit() {
  }

  setLanguage(languageSelect){
    this.isShow = false;
    this.language = languageSelect;
    this.tvService.language = languageSelect;
    this.movieService.language = languageSelect;
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/movies',{skipLocationChange:true}).then(()=>{
      this.router.navigate([currentUrl]);
    })
  }

}


