import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  private web3 = new Web3("https://cloudflare-eth.com");
  constructor() {

   }
  async getBalance(address:string){

    //test on address: to do
    const valInitial = await this.web3.eth.getBalance(address);
    let balance = this.web3.utils.fromWei(valInitial, "ether");
    console.log(balance)
  }
}
