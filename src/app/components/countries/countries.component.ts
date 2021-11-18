import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  data !: GlobalDataSummary[];
  countries: string[] =[];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered =0;
  constructor(private service : DataServiceService) { }

  ngOnInit(): void {
    this.service.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach((cs:any)=>{
        this.countries.push(cs.country)
      })
    })

  }
  updateValues(country: string){
    console.log(country);
    this.data.forEach((cs:any)=>{
      if(cs.country == country){
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalRecovered = cs.recovered
        this.totalDeaths = cs.deaths
      }
    })
  }

}
