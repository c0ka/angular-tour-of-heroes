import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService, Hero } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    // opt: this.route.paramMap for navigation in the same component
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe( data => this.hero = data )
  }

  goBack(): void {
    this.location.back()
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null
    // Pass along the hero id if available
    // include the short description of hero
    this.router.navigate(['/heroes', { id: heroId, fullName: hero.fullName}])
  }

}
