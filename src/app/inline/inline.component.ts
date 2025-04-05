import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.css'],
})
export class InlineComponent implements OnInit {
  constructor(public title: Title, private meta: Meta) {
    // Удаляем ставрые (неактуальные) метатеги
    this.meta.getTags('property^="og:"').forEach((tag) => {
      this.meta.removeTagElement(tag);
    });

    // Добавляем новые метатеги
    this.meta.addTags([
      { property: 'og:title', content: 'The Rock' },
      { property: 'og:type', content: 'video.movie' },
      { property: 'og:url', content: '//www.imdb.com/title/tt0117500/' },
    ]);
  }

  ngOnInit(): void {
    this.title.setTitle('Open Graph Page');
  }
}
