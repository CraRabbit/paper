import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterOutlet,
  ActivatedRoute,
} from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { fadeRouteAnimation } from './animations/fade.animation';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <!-- <nz-back-top></nz-back-top> -->
    <div class="full-height" [@fadeRouteAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
    <!--		todo:-->
    <!--		<ng-template appInitManager></ng-template>-->
    <!--		<app-multi-details-popup *ngIf="showMdp && !!mdpDms.mds.length"></app-multi-details-popup>-->
  `,
  styles: [
    `
      .full-height {
        height: 100vh;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: 100% 60%;
      }
    `,
  ],
  animations: [fadeRouteAnimation],
})
export class AppComponent implements OnInit {
  title = 'Bright City';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private route: ActivatedRoute,
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => this.route),
        map((r) => {
          while (r.firstChild) {
            r = r.firstChild;
          }
          return r;
        }),
        filter((r) => r.outlet === 'primary'),
        mergeMap((r) => r.data),
      )
      .subscribe((e) => {
        const title = e['title'];
        if (title) {
          this.titleService.setTitle(title);
        }
      });
  }
}
