import { Favourite } from './../inteface/favourite';
import { environment } from './../../../environments/environment';
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
  searchName = '';
  favourite: Favourite = {
    image: '',
    photographer: '',
    video: '',
    id: 1,
  };
  pageLength = 21;
  pageNo = 1;
  // isFavourite = false;

  @HostListener('window:scroll')
  onScroll(e: Event): void {
    this.scroll(e);
  }

  constructor(private service: ApiServiceService,
              private commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.searchName = this.commonService.searchItem;
    this.service.getVideoList(this.searchName, this.pageNo).subscribe( res => {
      console.log(res);
      this.data = res.videos;
    });
  }

  displayVideo(name: string): void{
    this.searchName = name;
    this.service.getVideoList(name, this.pageNo).subscribe( res => {
      this.data = res.videos;
    });
  }

  addToFavourite(id: any): void{
    // this.isFavourite = true;
    // this.commonService.saveFavourites(id, environment.favourite);
    this.commonService.saveFavourites(id);
  }

  removeFavourite(id: number): void{
    // this.isFavourite = false;
    // this.commonService.removeCurrentFavourite(id, environment.favourite);
    this.commonService.removeCurrentFavourite(id);
  }

  // isFavourite(id: number){
  //   const list = this.commonService.getFavourites(environment.favourite);
  //   return list.includes(id);
  // }

  favouriteAdded(index: number): any{
    const item = this.data[index];
    return this.commonService.checkFavourites(item);
  }

  scroll(e: Event) {
    if (window.pageYOffset !== undefined) {
      this.pageLength = pageYOffset;
      if (this.pageLength > (840 * this.pageNo)) {
        this.pageNo = this.pageNo + 1;
        this.service.getVideoList(this.searchName, this.pageNo).subscribe(res => {
          this.data = this.data.concat(res.videos);
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
