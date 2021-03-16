import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  @Output() searchItem = new EventEmitter<string>();

  data: any = [];
  searchName = 'animal';
  image: any = [];
  photographer: any = [];
  pageLength = 21;
  pageNo = 1;
  video = false;

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
      console.log(this.data);
      for (let i = 0; i< this.data.length; i++) {
        this.image.push(this.data[i].src.landscape);
        this.photographer.push(this.data[i].photographer);
      }
    });
  }

  displayPhoto(name: string): void{
    this.searchName = name;
    console.log(this.searchName);
    this.service.getPhotoList(this.searchName, this.pageNo).subscribe( res => {
      this.data = (res.photos);
      console.log(this.data);
      this.image = [];
      this.photographer = [];
      for (let i = 0; i < res.photos.length; i++) {
        this.image.push(res.photos[i].src.landscape);
        this.photographer.push(res.photos[i].photographer);
      }
    });
  }

  scroll(e: Event) {
    if (window.pageYOffset !== undefined) {
      this.pageLength = pageYOffset;
      if (this.pageLength > (390 * this.pageNo)) {
        this.pageNo = this.pageNo + 1;
        this.service.getPhotoList(this.searchName, this.pageNo).subscribe(res => {
          this.data = this.data.concat(res.photos);
          for (let i = 0; i< res.photos.length; i++) {
            this.image.push(res.photos[i].src.landscape);
            this.photographer.push(res.photos[i].photographer);
          }
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
