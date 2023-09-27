import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { TvShowsComponent } from './tv-shows.component';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    TvShowsRoutingModule,
    PipeModule,
    CarouselModule,
    SkeletonModule,
    MatPaginatorModule,
    FormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    TvShowsComponent,
  ]
})
export class TvShowsModule { }
