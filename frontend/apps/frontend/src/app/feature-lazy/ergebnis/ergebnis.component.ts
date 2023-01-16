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
  title: string = "";
  question: string = "";
  creator: string = "";
  endDate: string = "";
  code: string = "";
  receivedVotes: number[] = [];
  options: string[] = [];
  totalVotes: number = 0;

  chartData: ChartDataset[] = [{
    label: 'votes',
    data: this.receivedVotes
  }];
  chartLabels: string[] = this.options;
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
      this.code = x.get('id') ?? 'ERROR';
      this.pollsService.pollsGetPollResultPollCodeGet(this.code).subscribe(x => {
        this.title = x.pollName;
        this.question = x.pollQuestion;
        this.endDate = x.endTime;
        this.creator = x.creatorName;
        this.totalVotes = x.receivedAnswers;
        this.options = x.pollOptions.map(x => x.description);
        for(let option of this.options){
          this.receivedVotes.push(x.results[option].receivedVotes!)
        }
      });
     });
  }
}
