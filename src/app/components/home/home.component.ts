import { Component, OnInit, Input } from '@angular/core';

import { LoadKeysService } from '../../shared/services/loadKeys.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() contentData;

  constructor(private _srvLoader: LoadKeysService) { }

  ngOnInit() {
    this.contentData = this.contentData.HOME_PAGE_TXT;
  }
    

}
