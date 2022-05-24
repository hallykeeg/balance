import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  private web3s = new Web3("https://cloudflare-eth.com");
  private latestKnownBlockNumber = -1;
  private blockTime = 9000;
  constructor() {

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


async processBlock(blockNumber:number) {
  
    let block= await this.web3s.eth.getBlock(blockNumber,true);
    console.log(block.number);
    return block;
 /* for (const transactionHash of block.transactions) {
      let transaction = await this.web3s.eth.getTransaction(transactionHash);
      let transactionReceipt = await this.web3s.eth.getTransactionReceipt(transactionHash);
      transaction = Object.assign(transaction, transactionReceipt);
      
      console.log("Transaction: ", transaction);
       
  } */
  
}

async getLastBlock(){
  try {
    const lastMintedBlock = await this.web3s.eth.getBlockNumber();
    if(lastMintedBlock && lastMintedBlock!= this.latestKnownBlockNumber){
      this.latestKnownBlockNumber = lastMintedBlock;
      await this.processBlock(lastMintedBlock);
    }
    
  } catch (error) {
    console.log(error)
  }
}

async  checkCurrentBlock() {
  try {
    const currentBlockNumber = await this.web3s.eth.getBlockNumber();
  // console.log("Current blockchain top: " + currentBlockNumber, " | Script is at: " + this.latestKnownBlockNumber);
    if (this.latestKnownBlockNumber == -1 || currentBlockNumber > this.latestKnownBlockNumber) {
      await this.processBlock(this.latestKnownBlockNumber == -1 ? currentBlockNumber : this.latestKnownBlockNumber + 1);
    }
    // setTimeout(this.checkCurrentBlock, this.blockTime);
  } catch (error) {
    console.log(error)
  }
  
}

}
