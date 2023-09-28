import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsComponent } from './movie-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppMovieDialogComponent } from './app-movie-dialog/app-movie-dialog.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';


@NgModule({
  declarations: [
    MovieDetailsComponent,
    AppMovieDialogComponent
  ],
  entryComponents: [
    AppMovieDialogComponent
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    PipeModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    CarouselModule,
    SkeletonModule,
    HttpClientModule
  ],
  providers: [
    MoviesService,
    TvService
  ],
})
export class MovieDetailsModule { }
