import { Component, OnInit,OnDestroy } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  private blockTime = 10000;
  private _interval:any;
  constructor(private web3:Web3Service) { }

  ngOnInit(): void {
    this.web3.getLastBlock();
    this._interval = setInterval( ()=>this.web3.getLastBlock(), this.blockTime);
  }
    ngOnDestroy(){
      if(this._interval){
        clearInterval(this._interval);
      }
    }

}
