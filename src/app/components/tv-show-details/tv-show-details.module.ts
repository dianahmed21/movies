import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowDetailsRoutingModule } from './tv-show-details-routing.module';
import { TvShowDetailsComponent } from './tv-show-details.component';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TvShowDetailsComponent,
    AppTvDialogComponent
  ],
  entryComponents: [
    AppTvDialogComponent
  ],
  imports: [
    CommonModule,
    TvShowDetailsRoutingModule,
    PipeModule,
    TabViewModule,
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
  ]
})
export class TvShowDetailsModule { }
