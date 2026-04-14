import { Component } from '@angular/core';

interface Shelter {
  name: string;
  location: string;
  image: string;
  petCount: number;
  rating: number;
  tag: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  shelters: Shelter[] = [
    {
      name: 'Добрые руки',
      location: 'Алматы, Медеуский р-н',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=250&fit=crop',
      petCount: 45,
      rating: 4.9,
      tag: '⭐ Лучший'
    },
    {
      name: 'Лапки',
      location: 'Алматы, Алмалинский р-н',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
      petCount: 32,
      rating: 4.8,
      tag: '📍 Рядом'
    },
    {
      name: 'Четыре лапы',
      location: 'Алматы, Бостандыкский р-н',
      image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=250&fit=crop',
      petCount: 67,
      rating: 4.7,
      tag: '🐾 Много питомцев'
    },
    {
      name: 'Дом для друга',
      location: 'Нур-Султан, Есильский р-н',
      image: 'https://images.unsplash.com/photo-1556866261-8763a7662333?w=400&h=250&fit=crop',
      petCount: 28,
      rating: 4.6,
      tag: '🆕 Новый'
    }
  ];

  getStars(rating: number): string {
    return '⭐'.repeat(Math.floor(rating));
  }
}
