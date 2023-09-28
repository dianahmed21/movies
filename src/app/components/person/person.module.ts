import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'primeng/carousel';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from 'src/app/service/movies.service';
import { TvService } from 'src/app/service/tv.service';



@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    PipeModule,
    MatTabsModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [
    MoviesService,
    TvService
  ]
})
export class PersonModule { }
