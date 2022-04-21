import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    HeroDetailComponent,
    HeroListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule
  ],
  providers: [
    HeroService
  ]
})
export class HeroesModule { }
