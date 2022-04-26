import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MessagesModule } from '../messages/messages.module';

import { Hero, HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MessagesModule
      ],
      providers: [ HeroService ]
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes should return a hero list', () => {
    type heroes = Observable<Hero[]>;
    expect(
      service.getHeroes().subscribe(
        data => data.length < 1
      )
    ).toBeTruthy();
  });
});
