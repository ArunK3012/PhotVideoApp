import { CommonServiceService } from './../../service/common-service.service';
import { ApiServiceService } from './../../service/api-service.service';
import { Component, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() searchItem = new EventEmitter<string>();

  data: any = [];
  searchData = '';
  bgImage: any;
  homePage = true;
  scrollPage = true;
  navigation = '';
  scrollLength = 1;

  @HostListener('window:scroll') onScroll(e: Event): void {
    this.scroll(e);
  }

  constructor(private service: ApiServiceService,
              private commonservice: CommonServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.navigation = this.router.url.split('/')[3];
    if (this.navigation === 'details') {
      this.homePage = false;
      this.scrollPage = true;
    }
    else {
      this.homePage = true;
      this.scrollPage = true;
    }
    const page = 1;
    this.service.getBgImage(page).subscribe(res => {
      this.data = res.photos;
    });
  }

  onSearch(): void {
    this.commonservice.searchItem = this.searchData;
    this.searchItem.emit(this.searchData);
    // this.router.navigateByUrl('/home/photo');
  }

  scroll(e: Event): any {
    if (window.pageYOffset !== undefined) {
      this.scrollLength = pageYOffset;
      if (this.scrollLength > 200) {
        this.homePage = false;
        this.scrollPage = false;
      }
      else {
        this.homePage = true;
        if (this.navigation === 'details') {
          this.homePage = false;
        }
        this.scrollPage = true;
      }
      return pageYOffset;
    } else {
      let sy;
      const d = document;
      const r = d.documentElement;
      const b = d.body;
      sy = r.scrollTop || b.scrollTop || 0;
      return sy;
    }
  }

  openSearch(): void{
    document.getElementById('android-input-scroll')?.setAttribute('style', 'display: block');
  }
}
