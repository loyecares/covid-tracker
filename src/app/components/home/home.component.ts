import { GlobalDataSummary } from './../../models/global-data';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered =0;
  globalData !: GlobalDataSummary[];

  pieChart: GoogleChartInterface = {
  chartType: 'PieChart'
};
columnChart: GoogleChartInterface = {
  chartType: 'ColumnChart'
};
  constructor(private DataService: DataServiceService) {    }
  initChart(){
    let datatable:any = [];
    datatable.push(["Country", "Cases"])
    this.globalData.forEach((cs:any)=>{
      if( cs.confirmed  > 600000)
        datatable.push([
        cs.country , cs.confirmed
      ])

    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {height: 500},
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,
      //firstRowIsData: true,
      options: {height: 500},
    };
  }


  ngOnInit(): void {
    this.DataService.getGlobalData()
    .subscribe(
        {
          next : (result:any) =>{
            console.log(result);
            this.globalData = result;
            result.forEach((cs:any) => {
              if(!Number.isNaN(cs.confirmed)){
              this.totalActive += cs.active
              this.totalConfirmed += cs.confirmed
              this.totalDeaths += cs.deaths
              this.totalRecovered+= cs.recovered
              }
            });
            this.initChart();
          }
        }
      )
  }

}
