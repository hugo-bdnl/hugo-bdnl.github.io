import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { FormationComponent } from '../formation/formation.component';
import { MenuComponent } from '../menu/menu.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MenuComponent,
    FormationComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const fragment = event.urlAfterRedirects.split('/').pop();
          const element = document.getElementById(fragment!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }
}
