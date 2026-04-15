import { Component, OnInit, signal } from '@angular/core';
import { ApiService, Pet } from '../../services/api.service';

@Component({
  selector: 'app-why-us',
  standalone: true,
  templateUrl: './why-us.html',
  styleUrl: './why-us.css'
})
export class WhyUsComponent implements OnInit {
  hoveredPet = signal<string | null>(null);
  pets: Pet[] = [];
  isLoading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPets().subscribe({
      next: (data) => {
        this.pets = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки питомцев:', err);
        this.isLoading = false;
        // Fallback — данные отображаются даже без API
        this.pets = [
          {
            id: 1, name: 'Джек', breed: 'Джек-рассел-терьер', age: '2 года',
            species: 'dog', gender: 'male', gender_display: '♂ Мальчик',
            shelter: 1, shelter_name: 'Добрые руки',
            image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=face',
            video: 'https://videos.pexels.com/video-files/4692212/4692212-sd_640_360_25fps.mp4',
            description: '', is_adopted: false, created_at: ''
          },
          {
            id: 2, name: 'Мурка', breed: 'Британская короткошёрстная', age: '1.5 года',
            species: 'cat', gender: 'female', gender_display: '♀ Девочка',
            shelter: 2, shelter_name: 'Лапки',
            image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
            video: 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
            description: '', is_adopted: false, created_at: ''
          },
          {
            id: 3, name: 'Бобик', breed: 'Дворняга', age: '3 года',
            species: 'dog', gender: 'male', gender_display: '♂ Мальчик',
            shelter: 3, shelter_name: 'Четыре лапы',
            image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=300&fit=crop&crop=face',
            video: 'https://videos.pexels.com/video-files/3191207/3191207-sd_640_360_25fps.mp4',
            description: '', is_adopted: false, created_at: ''
          },
          {
            id: 4, name: 'Снежка', breed: 'Шотландская вислоухая', age: '8 месяцев',
            species: 'cat', gender: 'female', gender_display: '♀ Девочка',
            shelter: 4, shelter_name: 'Дом для друга',
            image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
            video: 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
            description: '', is_adopted: false, created_at: ''
          },
          {
            id: 5, name: 'Рекс', breed: 'Немецкая овчарка', age: '4 года',
            species: 'dog', gender: 'male', gender_display: '♂ Мальчик',
            shelter: 1, shelter_name: 'Добрые руки',
            image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop&crop=face',
            video: 'https://videos.pexels.com/video-files/4692212/4692212-sd_640_360_25fps.mp4',
            description: '', is_adopted: false, created_at: ''
          },
          {
            id: 6, name: 'Персик', breed: 'Рыжий метис', age: '6 месяцев',
            species: 'cat', gender: 'male', gender_display: '♂ Мальчик',
            shelter: 2, shelter_name: 'Лапки',
            image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop',
            video: 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
            description: '', is_adopted: false, created_at: ''
          }
        ];
      }
    });
  }

  onHover(name: string) {
    this.hoveredPet.set(name);
  }

  onLeave() {
    this.hoveredPet.set(null);
  }
}
