/** The root of the crisis center feature module,
 *  and also as a shell for this area with it's own <router-outlet> tag
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crisis-center',
  templateUrl: './crisis-center.component.html',
  styleUrls: ['./crisis-center.component.css']
})
export class CrisisCenterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
