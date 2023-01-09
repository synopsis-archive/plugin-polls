import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.scss']
})
export class ErgebnisComponent implements OnInit {

  umfragenTitel = "Umfrage Wombats";
  umfragenFrage = "Was essen Wombats?";
  umfragenErsteller = "Florian Nadler";
  umfragenDatum = "21.11.2022";
  umfragenCode:string = "";
  umfrageNumberCode:number = 0;

  chartData: ChartDataset[] = [{
    label: '$ in millions',
    data: [3, 4, 2, 6, 8]
  }];
  chartLabels: string[] = ['Bambus', 'Alex', 'Laub', 'Eukalyptus', 'wos ondas'];
  chartOptions: ChartOptions = {

    // ⤵️ Fill the wrapper
    responsive: true,
    maintainAspectRatio: false,

    // ⤵️ Remove the grids
    scales: {
      xAxis: {
        display: false,
        grid: {
          // removes random border at bottom
        }
      },
      yAxis: {
        display: false
      }
    },

    // ⤵️ Remove the main legend
    plugins: {
      legend: {
        display: true
      }
    }
  };

  constructor(private activatedRoute:ActivatedRoute)
  { 

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x=>this.umfrageNumberCode = +(x.get('id')??'0'));
    this.umfragenCode = this.umfrageNumberCode.toString();
  }

  
}
