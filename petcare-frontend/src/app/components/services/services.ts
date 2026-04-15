import { Component, OnInit } from '@angular/core';
import { ApiService, Shelter } from '../../services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit {
  shelters: Shelter[] = [];
  isLoading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getShelters().subscribe({
      next: (data) => {
        this.shelters = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки приютов:', err);
        this.isLoading = false;
        // Fallback данные если API недоступен
        this.shelters = [
          {
            id: 1, name: 'Добрые руки', location: 'Алматы, Медеуский р-н',
            image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=250&fit=crop',
            pet_count: 45, rating: 4.9, tag: '⭐ Лучший',
            description: '', phone: '', email: '', created_at: ''
          },
          {
            id: 2, name: 'Лапки', location: 'Алматы, Алмалинский р-н',
            image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
            pet_count: 32, rating: 4.8, tag: '📍 Рядом',
            description: '', phone: '', email: '', created_at: ''
          },
          {
            id: 3, name: 'Четыре лапы', location: 'Алматы, Бостандыкский р-н',
            image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=250&fit=crop',
            pet_count: 67, rating: 4.7, tag: '🐾 Много питомцев',
            description: '', phone: '', email: '', created_at: ''
          },
          {
            id: 4, name: 'Дом для друга', location: 'Нур-Султан, Есильский р-н',
            image: 'https://images.unsplash.com/photo-1556866261-8763a7662333?w=400&h=250&fit=crop',
            pet_count: 28, rating: 4.6, tag: '🆕 Новый',
            description: '', phone: '', email: '', created_at: ''
          }
        ];
      }
    });
  }
}
