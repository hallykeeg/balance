import { Component, OnInit,OnDestroy } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';
import { Block } from 'src/app/Block';
import { interval, Subscription, take } from 'rxjs';
import { OnlineStatusService } from 'ngx-online-status';
import { exit } from 'process';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit,OnDestroy {

   
  blocks:any[]=[];
  
  suscription!:Subscription;
  constructor(private web3:Web3Service, private onlineStatusService:OnlineStatusService) { }

  ngOnInit(): void {
    
     this.suscription= this.web3.launchBlockRecup().subscribe(
        (block:any)=>{ 
          if(!this.blocks.includes(block)) {this.blocks.unshift(block);
            // sessionStorage.setItem('blocks', JSON.stringify(this.blocks) );
            // sessionStorage.setItem('lastBlockBeforeDestroy', block.number );
          }
      }
      );
    
  }

  ngOnDestroy():void {
    this.suscription.unsubscribe()
  }


   getBlocks(){
    const blocks = sessionStorage.getItem('blocks') ;
    if( typeof blocks =="string"){
      this.blocks = JSON.parse(blocks);
    }
   }

}
