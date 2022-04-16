import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name : string = 'Balance';
  live : string = 'Live';
  me : string = 'About me';
  
  constructor() { }

  ngOnInit(): void {
  }

}
