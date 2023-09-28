import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() loading: boolean = true;
  language: string = !localStorage.getItem('lang') ? "en-US" : localStorage.getItem('lang');
  searchBarUp;
  leftSidebar;
  isShow: boolean = true;
  isShowLoading: boolean;

  constructor() { }

  ngOnInit() { }

  setLanguage(languageSelect) {
    this.isShow = false;
    this.language = languageSelect;
    localStorage.setItem('lang', languageSelect);
    window.location.reload();
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.isShowLoading = false;
    } else {
      this.isShowLoading = true;
    }
  }

}


