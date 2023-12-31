import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string;
  apiKey: string;
  language: string;
  region: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'dd4d819639705d332d531217b4f7c6b6';
    this.language = !localStorage.getItem('lang') ? "en-US" : localStorage.getItem('lang');
  }

  getNowPlaying(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  searchMovies(searchStr: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}&language=${this.language}`);
  }

  getPopular(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getUpComingMovies(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/upcoming?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}`);
  }

  getDiscoverMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}discover/movie?api_key=${this.apiKey}&language=${this.language}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMoviesByGenre(id: number, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}genre/${id}/movies?api_key=${this.apiKey}&language=${this.language}&page=${page}`);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}&language=${this.language}`);
  }

  getBackdropsImages(id: string) {
    return this.http.get(`${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMovieVideos(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}&language=${this.language}`);
  }

  getRecomendMovies(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`);
  }

  getPersonDetail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getPersonExternalData(id: string) {
    return this.http.get(`${this.baseUrl}person/${id}/external_ids?api_key=${this.apiKey}&language=${this.language}`);
  }

  getPersonCast(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}&language=${this.language}`);
  }

}
