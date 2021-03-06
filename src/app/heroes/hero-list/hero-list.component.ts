import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = []

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeros()
  }

  getHeros(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  //todo: add a search box, return a filtered result Hero[]
  searchHeroes() {

  }

}
