import { Component } from '@angular/core';

interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent {
  steps: Step[] = [
    {
      number: '01',
      icon: '🔍',
      title: 'Выбери приют',
      description: 'Просматривай список приютов в своём городе, читай отзывы и рейтинги'
    },
    {
      number: '02',
      icon: '📹',
      title: 'Познакомься с питомцем',
      description: 'Наведи на карточку — увидишь видео с животным. Посмотри, как он живёт'
    },
    {
      number: '03',
      icon: '📞',
      title: 'Свяжись с приютом',
      description: 'Напиши или позвони приюту напрямую. Договорись о встрече с питомцем'
    },
    {
      number: '04',
      icon: '❤️',
      title: 'Забери домой',
      description: 'Приезжай, познакомься лично и подари питомцу его новый дом'
    }
  ];
}
