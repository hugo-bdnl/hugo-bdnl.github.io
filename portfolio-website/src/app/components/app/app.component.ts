import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { CompetencesComponent } from '../competences/competences.component';
import { CvComponent } from '../cv/cv.component';
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
    CompetencesComponent,
    ProjectsComponent,
    CvComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
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

      const competenceButtons = document.querySelectorAll('.competence-btn');
      competenceButtons.forEach((button) => {
        this.renderer.listen(button, 'click', () => {
          const competence = button.getAttribute('data-competence');
          const targetElement = Array.from(
            document.querySelectorAll('.competence')
          ).find((el) => el.querySelector('h1')?.textContent === competence);

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  }
}
