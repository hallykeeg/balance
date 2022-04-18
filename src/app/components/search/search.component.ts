import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  placeholder : string = "Paste Ethereum address here";
  address : string = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
  constructor(private web3: Web3Service) { }

  ngOnInit(): void {
  }

 balance(){
   if(this.address){
     this.web3.getBalance(this.address);
   }
 }

}
