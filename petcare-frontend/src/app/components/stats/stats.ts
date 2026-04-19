import { Component, AfterViewInit } from '@angular/core';

interface StatItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class StatsComponent implements AfterViewInit {
  stats: StatItem[] = [
    { icon: '🏠', value: 25, suffix: '+', label: 'Приютов на платформе', current: 0 },
    { icon: '🐾', value: 300, suffix: '+', label: 'Питомцев ждут дом', current: 0 },
    { icon: '❤️', value: 120, suffix: '+', label: 'Уже нашли семью', current: 0 },
    { icon: '📹', value: 500, suffix: '+', label: 'Видео питомцев', current: 0 }
  ];

  private animated = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );
    const el = document.querySelector('#stats');
    if (el) observer.observe(el);
  }

  private animateCounters() {
    this.stats.forEach((stat) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        stat.current = Math.min(Math.round(increment * step), stat.value);
        if (step >= steps) {
          stat.current = stat.value;
          clearInterval(timer);
        }
      }, duration / steps);
    });
  }
}
