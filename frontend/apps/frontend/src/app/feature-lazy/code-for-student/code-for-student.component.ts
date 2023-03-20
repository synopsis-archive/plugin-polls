import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-code-for-student',
  templateUrl: './code-for-student.component.html',
  styleUrls: ['./code-for-student.component.css'],
})
export class CodeForStudentComponent implements OnInit {
  code:String = "";

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x => {
      this.code = x.get('id') ?? 'ERROR';
    });
  }

  openErgebnis():void{
    this.router.navigateByUrl(`/Ergebnisansicht/${this.code}`).then(r => console.log('Routed to Ergebnisansicht'));
  }

  openLehreransicht():void{
    this.router.navigateByUrl(`/LehreransichtListe`).then(r => console.log('Routed to Ergebnisansicht'));

  }
}
