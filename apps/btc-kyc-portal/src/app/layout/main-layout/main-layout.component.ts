import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    [CommonModule, RouterModule, HeaderComponent, FooterComponent] as const,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    RouterOutlet
  ],
  template: `
    <div class="flex flex-col min-h-screen font-poppins">
      <app-header></app-header>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  providers: [ReactiveFormsModule]
})
export class MainLayoutComponent {
  constructor(@Inject(FormBuilder) private fb: FormBuilder) {}
}
