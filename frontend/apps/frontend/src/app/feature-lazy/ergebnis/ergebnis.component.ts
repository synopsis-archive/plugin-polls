import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';
import { PollsService } from '../../polls-backend';

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
  umfragenCode: string = "";
  umfrageNumberCode: number = 0;
  umfragenVotes:number[] = [];
  umfragenOptions:string[] = [];
  umfragenTotalVotes:number = 0;


  chartData: ChartDataset[] = [{
    label: 'votes',
    data: this.umfragenVotes
  }];
  chartLabels: string[] = this.umfragenOptions;
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

  constructor(private activatedRoute: ActivatedRoute, private pollsService: PollsService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x => { 
      this.umfrageNumberCode = +(x.get('id') ?? '0');
      this.umfragenCode = this.umfrageNumberCode.toString();
      this.pollsService.pollsGetPollResultPollCodeGet(this.umfragenCode).subscribe( x => {
        this.umfragenTitel = x.pollName;
        this.umfragenFrage = x.pollQuestion;
        this.umfragenDatum = x.startTime;
        this.umfragenTotalVotes = x.receivedAnswers;
        for(let option of x.pollOptions){
            this.umfragenOptions.push(option.description);
        }
        for(let option of this.umfragenOptions){
          this.umfragenVotes.push(x.results[option].receivedVotes!)
        }
      })
     });
  }


}
