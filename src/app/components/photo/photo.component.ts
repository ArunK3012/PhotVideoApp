import { environment } from './../../../environments/environment';
import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Favourite } from '../inteface/favourite';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Output() searchItem = new EventEmitter<string>();

  data: any = [];
  video: any = [];
  searchName = 'animal';
  // background: any = [];
  isFavourite = false;
  bgImage: any;
  artist = '';
  favourite: Favourite = {
    image: '',
    photographer: '',
    video: '',
    id: 1,
  };
  pageLength = 21;
  pageNo = 1;
  photoList: Favourite[] = [];

  @HostListener('window:scroll')
  onScroll(e: Event): void {
    this.scroll(e);
  }

  constructor(private service: ApiServiceService,
              private commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.searchName = this.commonService.searchItem;
    this.service.getPhotoList(this.searchName, this.pageNo).subscribe( res => {
      this.data = (res.photos);
      // this.photoList.push(this.data);
    });
  }

  displayPhoto(name: string): void{
    this.searchName = name;
    this.service.getPhotoList(name, this.pageNo).subscribe( res => {
      this.data = (res.photos);
      // this.photoList.push(this.data);
    });
  }

  addToFavourite(event: MouseEvent, id: any): void{
    // this.isFavourite = true;
    this.commonService.saveFavourites(id);
    event.stopImmediatePropagation();
  }

  removeFavourite(event: MouseEvent, id: number): void{
    // this.isFavourite = false;
    this.commonService.removeCurrentFavourite(id);
    event.stopPropagation();
  }

  favouriteAdded(index: number): any{
    const item = this.data[index];
    return this.commonService.checkFavourites(item);
  }

  // isFavourite(id: number){
  //   const list = this.commonService.getFavourites(environment.favourite);
  //   return list.includes(id);
  // }

  scroll(e: Event) {
    if (window.pageYOffset !== undefined) {
      this.pageLength = pageYOffset;
      if (this.pageLength > (840 * this.pageNo)) {
        this.pageNo = this.pageNo + 1;
        this.service.getPhotoList(this.searchName, this.pageNo).subscribe(res => {
          this.data = this.data.concat(res.photos);
          console.log(res);
        });
      }
      return pageYOffset;
    }
    else {
      let sy;
      const d = document;
      const r = d.documentElement;
      const b = d.body;
      sy = r.scrollTop || b.scrollTop || 0;
      return sy;
    }
  }
}
