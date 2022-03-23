import { Component, OnInit } from '@angular/core';
import { TheoryService } from '../_services/theory.service';

@Component({
  selector: 'app-theory',
  templateUrl: './theory.page.html',
  styleUrls: ['./theory.page.scss'],
})
export class TheoryPage implements OnInit {

  theories: any;

  constructor(private theoryService: TheoryService) { }

  async ngOnInit() {
    await this.theoryService.getAll().subscribe(data => {
      if (data) {
        //console.log(data);
        this.theories = data;
        //console.log(this.theories);
      }
    }, err => {
      console.log(err);
    });
  }

  openLink(url: string) {
    window.open(url, '_system', 'location=yes');
  }

}
