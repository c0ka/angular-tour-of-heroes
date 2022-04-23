import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
  crisis$!: Observable<Crisis[]>
  selectedId = 0

  constructor(private service: CrisisService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap( param => {
        this.selectedId = parseInt(param.get('id')!, 10)
        return this.service.getCrisis()
      })
    )
  }

}
