import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService, Hero } from '../hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  /* todo:
    since this component is just a form wrapper, we could delete the hero state:
    1. subscribe the service value and init formGroup,
    2. update the model data on the form's submit event
  */
  hero: Hero | undefined
  heroForm!: FormGroup
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero()
    // getHero is async, so the form will be updated later
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero?.name, 
        [Validators.required, Validators.minLength(4)]),
      fullName: new FormControl(this.hero?.fullName),
      shortDescription: new FormControl(this.hero?.shortDescription),
      longDescription: new FormControl(this.hero?.longDescription)
    })
  }

  getHero(): void {
    // opt: this.route.paramMap for navigation in the same component
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe( data => this.hero = data )
  }

  onFormSubmit() {
    this.hero = this.heroForm.value
    // todo: update the model data
  }
  
  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null
    // Pass along the hero id if available
    // include the short description of hero
    this.router.navigate(['/heroes', { id: heroId, fullName: hero.fullName}])
  }
  
  goBack(): void {
    this.location.back()
  }

  getErrorMessage(field: string) {
    const target = this.heroForm.get(field) as FormControl

    if (target.hasError('required')) return 'Name is required.'
    if (target.hasError('minLength')) return 'Name must be at least 4 characters long.'

    return 'Not a valid name'
  }
}
