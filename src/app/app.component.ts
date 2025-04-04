import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title = 'evoApp';
  constructor(public title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Desk Page');
  }
}
