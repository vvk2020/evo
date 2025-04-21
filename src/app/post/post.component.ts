import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public post: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post = this.route.snapshot.data['post'];
    console.log('AAA:', this.post);
  }
}
