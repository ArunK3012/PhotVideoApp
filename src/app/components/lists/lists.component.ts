import { ApiServiceService } from './../../service/api-service.service';
import { CommonServiceService } from './../../service/common-service.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  @Input() data: any;
  @Input() image: any;
  @Input() photographer: any;
  @Input() video = true;
  dispVideo = 'true';
  dispPhoto = 'true';
  details: any = [];

  constructor(private commonService: CommonServiceService) { }

  ngOnInit(): void {
  }

  addToFavourite(event: MouseEvent, id: any): void{
    this.commonService.saveFavourites(id);
    event.stopImmediatePropagation();
  }

  removeFavourite(event: MouseEvent, id: number): void{
    this.commonService.removeCurrentFavourite(id);
    event.stopPropagation();
  }

  favouriteAdded(index: number): any{
    const item = this.data[index];
    return this.commonService.checkFavourites(item);
  }
}
