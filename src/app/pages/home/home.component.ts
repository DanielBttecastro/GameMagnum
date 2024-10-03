import { Component, OnInit } from '@angular/core';
import { MessageHomeComponent } from 'src/app/shared/message-home/message-home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css'],
  standalone: true,
  imports: [MessageHomeComponent]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
