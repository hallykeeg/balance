import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() balanceEvent : EventEmitter<string> = new EventEmitter<string>();

  placeholder : string = "Paste Ethereum address here";
  address : string = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  resultat : string = "";

  constructor(private web3:Web3Service) { }

  ngOnInit(): void {
  }

 balance(){
   if( !this.web3.isAddressValid(this.address) ){
     alert('Invalid Address provided');
   }else{
      this.web3.getBalance(this.address).then((data)=>{
        this.resultat = this.toFloatString(data);
        
      });
   }
 }
 toFloatString(nb:string):string
 {
  let nbFloat = parseFloat(nb);
  if(isNaN(nbFloat)){return "0 ETH";}
  return nbFloat.toFixed(4) +" ETH";
 }

}
