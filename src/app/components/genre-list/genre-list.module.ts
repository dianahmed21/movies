import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { GenreListRoutingModule } from './genre-list-routing.module';
import { GenreListComponent } from './genre-list.component';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [GenreListComponent],
  imports: [
    CommonModule,
    GenreListRoutingModule,
    MatButtonModule,
    SkeletonModule,
    HttpClientModule
  ]
})
export class GenreListModule { }
