import { Favourite } from './../inteface/favourite';
import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  searchName = '';
  data: any = [];
  image = '';
  androidImage = '';
  zoomScale = 100;
  zoomDec = 0;
  zoomInc = 0;

  constructor(private router: Router,
              private service: ApiServiceService,
              private commonService: CommonServiceService) { }

  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    this.service.getPhotoDetails(id).subscribe(res => {
      this.data = res;
      this.image = res.src.landscape;
      this.androidImage = res.src.large2x;
    });
  }

  displayPhoto(name: string): void{
    this.searchName = name;
  }

  addToFavourite(id: any): void{
    this.commonService.saveFavourites(id);
  }

  removeFavourite(id: number): void{
    this.commonService.removeCurrentFavourite(id);
  }

  favouriteAdded(index: Favourite): any{
    return this.commonService.checkFavourites(index);
  }

  zoomIn() {
    const myImg = document.getElementById('map');
    if (myImg !== null) {
      const currWidth = myImg.clientWidth;
      const currHeight = myImg.clientHeight;
      if (currWidth === 100) {
        return false;
      }
      myImg.style.width = (currWidth + 10) + 'px';
      myImg.style.height = (currHeight + 10) + 'px';
    }
    return false;
  }

  zoomOut() {
    const myImg = document.getElementById('map');
    if (myImg !== null) {
      const currWidth = myImg.clientWidth;
      const currHeight = myImg.clientHeight;
      if (currWidth === 100) {
        return false;
      }
      myImg.style.width = (currWidth - 10) + 'px';
      myImg.style.height = (currHeight - 10) + 'px';
    }
    return false
  }

  zoomInAndroid(scale: number) {
    const myImg = document.getElementById('androidMap');
    if (myImg !== null) {
      this.zoomInc = this.zoomInc + scale;
      myImg.style.width = this.zoomScale + scale  + '%';
      myImg.style.height = this.zoomScale + scale  + '%';
      this.zoomScale = this.zoomScale + scale;
    }
    return false;
  }

  zoomOutAndroid(scale: number) {
    const myImg = document.getElementById('androidMap');
    const pixels = 100;
    if (myImg !== null) {
      this.zoomDec = this.zoomDec + scale;
      myImg.style.width = this.zoomScale - scale  + '%';
      myImg.style.height = this.zoomScale - scale + '%';
      this.zoomScale = this.zoomScale - scale;
    }
    return false;
  }

  goBack(): void{
    window.history.back();
  }
}
