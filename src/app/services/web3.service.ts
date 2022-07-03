import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { concatMap, filter, forkJoin, from, interval,delay, Observable, of,map, range, skipWhile, Subject, Subscription,switchMap, tap } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  private web3s = new Web3("https://cloudflare-eth.com");
  private latestKnownBlockNumber = -1;

  
  private blockTime = 5000;
  observableBlock!:Observable<any>;
  observableBlockNumber!:Observable<any>;
  suscription!:Subscription;

   

  recentBlockNumber:number = 0;

  constructor() {

   }

   
   formatBlockOperator(source:Observable<any>){
    return new Observable(observer=>{
      const sub = source.subscribe({
        next: (block)=>observer.next( {
          "number": block.number,
          "transactions" : block.transactions.length,
          "size" : (block.size/1024).toFixed(2)+' KB',
          "difficulty" : (block.difficulty/ Math.pow(10,15)).toFixed(2)+' P',//11695012342187640
          "date" : moment.unix(block.timestamp).format("YYYY-MM-DD HH:mm:ss")
        }  ),
        error: (error)=>observer.error(error),
        complete : ()=>observer.complete()
      })
       
    })
   }

   

  
  launchBlockRecup() 
  {
    try{
     
      const interval$ = interval(this.blockTime);

     return interval$.pipe(
        concatMap( (val:number)=>{
          return this.getLastBlockNumber();
        }),
        

        filter( (blockNumber:number)=>{
          return blockNumber != this.latestKnownBlockNumber;
        } ),
        

        concatMap( (val:number)=>{
          if( this.latestKnownBlockNumber !=-1 &&  val- this.latestKnownBlockNumber>1){
            return range(this.latestKnownBlockNumber+1, val- this.latestKnownBlockNumber).pipe(delay(2500))
          }
          return of(val) 
        }),
        concatMap((val:number)=>{
          return this.getLastBlockMinted(val)
        }),
        tap(block=>{ 
          this.latestKnownBlockNumber=block.number;
        }),
        this.formatBlockOperator

       //
       
      );
    
    }catch(err){console.log(err); return of(0)}
  }



  async getBalance(address:string)
  {

    //test on address: to do
    const valInitial = await this.web3s.eth.getBalance(address);
    let balance = this.web3s.utils.fromWei(valInitial, "ether");
    return balance;
  }
  isAddressValid(address:string):boolean
  {
    return this.web3s.utils.isAddress(address);
  }


 

 

getLastBlockNumber():Observable<number>{
  return from( this.web3s.eth.getBlockNumber() );
}

getLastBlockMinted( blockNumber:number ):Observable<any>
{
  if(blockNumber!=this.recentBlockNumber){
   return from( this.web3s.eth.getBlock(blockNumber,true) );
  }
   return of(0);
}


}
