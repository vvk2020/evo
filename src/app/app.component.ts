import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title = 'evoApp';
  constructor(public title: Title, private meta: Meta) {
    this.meta.addTag({ name: 'og:descr', content: 'root_desc' });
  }

  ngOnInit(): void {
    this.title.setTitle('Desk Page');
  }
}
