import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  result : string = "";
  constructor() { }

  ngOnInit(): void {
  }

  setResult(msg:string){
    this.result = msg;
  }
}
