import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  readonly navLinks = [
    { label: 'Главная',          href: '#hero' },
    { label: 'Как это работает', href: '#how-it-works' },
    { label: 'Команда',          href: '#team' },
    { label: 'Контакты',         href: '#contact' },
  ];

  readonly petsRoute = '/pets';
  readonly sheltersRoute = '/shelters';
  readonly dashboardRoute = '/dashboard';

  constructor(public auth: AuthService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  scrollTo(href: string, event: Event) {
    event.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeMobileMenu();
    }
  }

  logout() {
    this.auth.logout();
  }
}
