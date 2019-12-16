import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

import  data  from 'src/assets/data/modulor.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  @Output() contentData;

  //implementar autorization del token

  constructor(private authService: AuthService) {}

  ngOnInit() {

    this.contentData = data;

    this.authService.autoAuthUser();
  }
}
