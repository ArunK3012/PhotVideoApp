import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  data: any = [];
  searchName = 'animal';
  pageLength = 21;
  pageNo = 1;
  image: any = [];
  video = true;
  photographer: any = [];

  @HostListener('window:scroll')
  onScroll(e: Event): void {
    this.scroll(e);
  }

  constructor(private service: ApiServiceService,
              private commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.searchName = this.commonService.searchItem;
    this.service.getVideoList(this.searchName, this.pageNo).subscribe( res => {
      this.data = res.videos;
      for (let i = 0; i< this.data.length; i++) {
        this.image.push(this.data[i].image);
        this.photographer.push(this.data[i].user.name);
      }
    });
  }

  displayVideo(name: string): void{
    this.searchName = name;
    console.log(this.searchName);
    this.service.getVideoList(this.searchName, this.pageNo).subscribe( res => {
      this.data = res.videos;
      for (let i = 0; i< res.videos.length; i++) {
        this.image.push(res.videos[i].image);
        this.photographer.push(res.videos[i].user.name);
      }
    });
  }

  scroll(e: Event) {
    if (window.pageYOffset !== undefined) {
      this.pageLength = pageYOffset;
      if (this.pageLength > (390 * this.pageNo)) {
        this.pageNo = this.pageNo + 1;
        this.service.getVideoList(this.searchName, this.pageNo).subscribe(res => {
          this.data = this.data.concat(res.videos);
          for (let i = 0; i < res.videos.length; i++) {
            this.image.push(res.videos[i].image);
            this.photographer.push(res.videos[i].user.name);
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
