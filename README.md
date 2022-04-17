# Refactor Of The Tutorial: AngularTourOfHeroes

## Origin Edition
1. heroes.component
2. hero-detail.component
3. hero.service & RxJS
4. messages.component & service
5. dashboard.component
6. app-routing.module

## Angular Material

## Mock Data of Marvel's Characters
Json data: `/src/assets/mock-heroes.json`

## HttpClient
Get json data with HttpClient: `/src/app/hero.service.ts`
1. using HttpClient.get
2. retry
3. error handling

## Caching Interceptor
Caching logic: `/src/app/request-cache.service.ts`
Caching interceptor: `/src/app/http-interceptors`
