import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'primeng/carousel';
import { SliderComponent } from '../slider/slider.component';


@NgModule({
  declarations: [HomeComponent, SliderComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PipeModule,
    SkeletonModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    CarouselModule
  ],
})
export class HomeModule { }
