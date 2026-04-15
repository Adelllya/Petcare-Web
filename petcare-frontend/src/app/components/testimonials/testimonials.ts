import { Component, OnInit } from '@angular/core';
import { ApiService, Service } from '../../services/api.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent implements OnInit {
  steps: Service[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getServices().subscribe({
      next: (data) => {
        this.steps = data;
      },
      error: (err) => {
        console.error('Ошибка загрузки шагов:', err);
        // Fallback
        this.steps = [
          { id: 1, number: '01', icon: '🔍', title: 'Выбери приют', description: 'Просматривай список приютов в своём городе, читай отзывы и рейтинги', order: 1 },
          { id: 2, number: '02', icon: '📹', title: 'Познакомься с питомцем', description: 'Наведи на карточку — увидишь видео с животным. Посмотри, как он живёт', order: 2 },
          { id: 3, number: '03', icon: '📞', title: 'Свяжись с приютом', description: 'Напиши или позвони приюту напрямую. Договорись о встрече с питомцем', order: 3 },
          { id: 4, number: '04', icon: '❤️', title: 'Забери домой', description: 'Приезжай, познакомься лично и подари питомцу его новый дом', order: 4 },
        ];
      }
    });
  }
}
