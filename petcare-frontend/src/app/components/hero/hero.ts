import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  scrollToServices(event: Event) {
    event.preventDefault();
    document.querySelector('#shelters')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact(event: Event) {
    event.preventDefault();
    document.querySelector('#pets')?.scrollIntoView({ behavior: 'smooth' });
  }
}
