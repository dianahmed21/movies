import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvGenreRoutingModule } from './tv-genre-routing.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { HttpClientModule } from '@angular/common/http';
import { TvGenreComponent } from './tv-genre.component';

@NgModule({
  declarations: [TvGenreComponent],
  imports: [
    CommonModule,
    TvGenreRoutingModule,
    PipeModule,
    SkeletonModule,
    HttpClientModule
  ],
  providers: [
    MoviesService,
    TvService
  ]
})
export class TvGenreModule { }
