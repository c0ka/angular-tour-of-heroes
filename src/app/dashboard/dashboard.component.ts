import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { HeroService, Hero } from '../heroes/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(data => this.heroes = data.slice(1, 5));
  }

  drop(e: CdkDragDrop<Hero[]>) {
    moveItemInArray(this.heroes, e.previousIndex, e.currentIndex)
  }
}