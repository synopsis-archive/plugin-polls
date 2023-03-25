import { Component, Inject, LOCALE_ID } from '@angular/core';
import { PollOptionReplayDto, PollReplayDto, PollDto, PollsService } from "../../polls-backend";
import {DatePipe, formatDate, Location} from '@angular/common';


@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent {
  title: string = '';
  question: string = '';
  options: string[] = ["", ""];
  // optionsIndices:number[]=[0,1];
  dateFrom = new Date();
  dateTo = new Date();
  timeFrom = new Date();
  timeTo = new Date();
  multipleChoice = false;

  errorDateHidden = true;
  errorTimeHidden = true;

  customAlert = '';

  successAlert = '';
  successAlertLink = ''
  successAlertHidden = true;

  constructor(private backendService: PollsService,private _location: Location, @Inject(LOCALE_ID) private locale: string) {
    this.dateFrom = new Date();
    this.dateTo = new Date();

    //this.timeFrom = new Date().getUTCHours()+":"+new Date().getUTCMinutes();
    this.timeFrom = new Date();

    let tmp = new Date();
    tmp.setHours(tmp.getHours()+1);

    this.timeTo = tmp;
   }

  // setOptionsIndices():void{
  //   this.optionsIndices= [...new Array(this.options.length).keys()];
  // }

  get optionsIndices():number[]{
       return [...new Array(this.options.length).keys()];

  }

  //If attributes are correct, create a replayDTO of the options, get the set variables and post the replayDTO
  createPoll(): void {
    if (!this.checkAttributes())
      return;

    const options: PollOptionReplayDto[] = this.options.map(x => { return { description: x }; });
    // 2023-01-23T07:39:24.126Z
    // 2023-01-23 09:42

    var datePipe = new DatePipe(this.locale);

    const startTime = `${formatDate(this.dateFrom,'yyyy-MM-dd', this.locale)}T${datePipe.transform(this.timeFrom, 'hh:mm')}:00.000Z`;
    const endTime = `${formatDate(this.dateTo,'yyyy-MM-dd', this.locale)}T${datePipe.transform(this.timeTo, 'hh:mm')}:00.000Z`;
    const pollReplayDto: PollReplayDto = {
      pollName: this.title,
      pollQuestion: this.question,
      startTime: startTime,
      endTime: endTime,
      isMultipleChoice: this.multipleChoice,
      pollOptions: options
    }
    console.log(startTime);
    console.log(endTime);
    // 2023-01-23T08:44:00.000Z
    this.backendService.pollsPost(pollReplayDto).subscribe((x: PollDto) => {
      //TODO: Do something with this code
      console.log(x.pollCode);
      console.log(JSON.stringify(x));

      this.successAlert = 'Poll ' + x.pollName + ' erfolgreich erstellt! Um ihn anzusehen, klicken Sie ';
      this.successAlertLink = `Ergebnisansicht/${x.pollCode}`;
      this.successAlertHidden=false;
      this.resetFields();
    });
  }

  timeParseTo(date : string)
  {

    let split = date.split(":");

    let dateTmp = new Date();
    dateTmp.setHours(parseInt(split[0]));
    dateTmp.setMinutes(parseInt(split[1]));

    this.timeTo = dateTmp;
    console.log(dateTmp);
    this.CheckTime();
  }

  timeParseFrom(date : string)
  {

    let split = date.split(":");

    let dateTmp = new Date();
    dateTmp.setHours(parseInt(split[0]));
    dateTmp.setMinutes(parseInt(split[1]));

    this.timeFrom = dateTmp;
    console.log(dateTmp);
    this.CheckTime();
  }

  dateParseFrom(date : Date)
  {
    this.dateFrom = date;
    this.CheckDate();
  }

  dateParseTo(date : Date)
  {
    this.dateTo = date;
    this.CheckDate();
  }


  resetFields()
  {
    this.title = "";
    this.question = "";
    this.options = ["", ""];

  this.dateFrom = new Date();
  this.dateTo = new Date();

  this.timeFrom = new Date();

    let tmp = new Date();
    tmp.setHours(tmp.getHours()+1);

    this.timeTo = tmp;

  this.multipleChoice = false;

  this.errorDateHidden = true;
  this.errorTimeHidden = true;

  this.customAlert = '';
  }

  backButtonClicked():void{
    this._location.back();

  }

  //Checks the Date, Time, Title, OptionsAmount and OptionsRepeat. If unsuccessful, alerts the user and returns false, else returns true
  private checkAttributes() {
    this.customAlert = '';

    if(this.CheckAll())
    {
      return true;
    }
    alert(this.customAlert);
    return false;
  }

  public addOption()
  {
    this.options.push("");
    // this.setOptionsIndices();
  }

  public removeOption(id : number)
  {
    this.options.splice(id, 1);//remove element from array
    // this.setOptionsIndices();
  }

  public isEssentialOption(id : number)
  {
    if(id === 0 || id === 1)
    {
      return true;
    }
    return false;
  }

  private CheckAll()
  {
    let check1 = this.CheckDate();
    let check2 = this.CheckTime();
    let check3 = this.CheckTitle();
    let check4 = this.CheckOptionsAmount();
    let check5 = this.CheckOptionsRepeat();

    if(check1 && check2 && check3 && check4 && check5)
    {
      return true;
    }
    return false;
  }

  removeTimeFromDate(date : Date)
  {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  //Checks if the DateTo is later than the DateFrom
  CheckDate()
  {
    let dateTmp = this.removeTimeFromDate(new Date());

    if(this.removeTimeFromDate(this.dateFrom) < dateTmp || this.removeTimeFromDate(this.dateTo) < dateTmp)
    {
      this.customAlert += "Anfangs- oder Enddatum vor dem heutigen Datum\n";
      return false;
    }


    if(this.dateFrom === null || this.dateTo === null)
    {
this.customAlert += "Falsche Datumsangabe(n)\n";
      return false;
}
    if(this.dateFrom > this.dateTo)
    {
      this.errorDateHidden = false;
      this.customAlert += "Falsche Datumsangabe(n)\n";
      return false;
    }
    this.errorDateHidden = true;
    return true;
  }

  CheckTime()
  {
    if(this.dateFrom === this.dateTo)
    {
      if(this.timeFrom.getTime() > this.timeTo.getTime())
      {
        this.errorTimeHidden = false;
        this.customAlert += "Falsche Zeitangabe(n)\n";
        return false;
      }
      }

      this.errorTimeHidden = true;
      return true;
    }


  CheckTitle()
  {
    if(this.title.trim().length <= 0 || this.question.trim().length <= 0) {
      //alert("Ein Titel bzw. eine Frage wird benötigt.");
      this.customAlert += "Ein Titel bzw. eine Frage wird benötigt\n";
      return false;
    }
    return true;
  }

  CheckOptionsAmount()
  {
    if(this.options.length < 1 || this.options.every(x => x.trim().length <= 0)) {
      //alert("Es müssen mindestens zwei Antwortoption angegeben werden.");
      this.customAlert += "Es müssen mindestens zwei Antwortoption angegeben werden\n";
      return false;
    }
    return true;
  }

  CheckOptionsRepeat()
  {
    /* if(!this.options.every((e, i, a) => a.indexOf(e) === i))
    {
      //DO Error
      this.customAlert += "Doppelte Antwortmöglichkeiten\n";
      return false;
    }
    return true; */

    console.log(this.options.length);
    if(this.options.length === 0)
    {
      return true;
    }

    let repeat = this.options.length === new Set(this.options).size;

    if(!repeat)
    {
      this.customAlert += "Doppelte Antwortmöglichkeiten\n";
      return false;
    }
    else
    {
      return true;
    }
  }
}
