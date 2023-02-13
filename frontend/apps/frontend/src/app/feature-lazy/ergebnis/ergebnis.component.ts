import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions } from 'chart.js';
import {PollResultDto, PollsService} from '../../polls-backend';
import { Location } from '@angular/common';
import {LiveResultUpdateService} from "../../core/live-result-update.service";

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

 //Data set with recieved votes as data
  chartData: ChartDataset[] = [{
    label: 'votes',
    data: this.receivedVotes
  }];
  //Labels = Options
  chartLabels: string[] = this.options;

  //Create options
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

  constructor(private activatedRoute: ActivatedRoute, private pollsService: PollsService, private _Location: Location,
              private pollResultUpdates: LiveResultUpdateService) { }

  backbuttonCLicked() {
    this.pollResultUpdates.unregisterListener(this.code);
    this._Location.back();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(x => {
      this.code = x.get('id') ?? 'ERROR';
      //Get Poll from code, set variables from it
      this.pollsService.pollsGetPollResultPollCodeGet(this.code).subscribe(x => {
        this.pollResultUpdates.registerListener(this.code, this.newPollResultReceived);
        this.updateDisplayedResult(x);
      });
    });
  }

  private updateDisplayedResult(x: PollResultDto) {
        this.title = x.pollName;
        this.question = x.pollQuestion;
        this.endDate = x.endTime;
        this.creator = x.creatorName;
        this.totalVotes = x.receivedAnswers;
        this.options = x.pollOptions.map(x => x.description);
//Push the recieved votes of every option into recievedVotes
    for (const option of this.options) {
          this.receivedVotes.push(x.results[option].receivedVotes!)
        }
        //Set the chart data from the recieved votes
        this.chartData = [{
          label: 'votes',
          data: this.receivedVotes
        }];
        this.chartLabels = this.options;
        this.chartOptions = {
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
        }
  }

  private newPollResultReceived(pollResult: PollResultDto) {
    this.updateDisplayedResult(pollResult);
  }
}
