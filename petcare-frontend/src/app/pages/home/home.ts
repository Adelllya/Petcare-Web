import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { StatsComponent } from '../../components/stats/stats';
import { AboutComponent } from '../../components/about/about';
import { ServicesComponent } from '../../components/services/services';
import { WhyUsComponent } from '../../components/why-us/why-us';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { TeamComponent } from '../../components/team/team';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    StatsComponent,
    AboutComponent,
    ServicesComponent,
    WhyUsComponent,
    TestimonialsComponent,
    TeamComponent,
    ContactComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
