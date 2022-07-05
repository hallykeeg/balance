import { Component, OnInit,OnDestroy } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';
import { Block } from 'src/app/Block';
import { interval, Subscription, take } from 'rxjs';
import { OnlineStatusService } from 'ngx-online-status';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  private blockTime = 1000;
  private _interval:any;
  blocks:any[]=[];
  
  suscription!:Subscription;
  constructor(private web3:Web3Service, private onlineStatusService:OnlineStatusService) { }

  ngOnInit(): void {
    
    
    

    this.suscription = this.web3.launchBlockRecup().subscribe(
      (block)=>{ if(!this.blocks.includes(block)) {this.blocks.unshift(block);}}
    );
    
  }
    ngOnDestroy(){
     this.suscription.unsubscribe()
    }

}
