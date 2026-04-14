import { Component, signal } from '@angular/core';

interface PetCard {
  name: string;
  breed: string;
  age: string;
  shelter: string;
  image: string;
  video: string;
  gender: string;
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  templateUrl: './why-us.html',
  styleUrl: './why-us.css'
})
export class WhyUsComponent {
  hoveredPet = signal<string | null>(null);

  pets: PetCard[] = [
    {
      name: 'Джек',
      breed: 'Джек-рассел-терьер',
      age: '2 года',
      shelter: 'Добрые руки',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=face',
      video: 'https://videos.pexels.com/video-files/4692212/4692212-sd_640_360_25fps.mp4',
      gender: '♂ Мальчик'
    },
    {
      name: 'Мурка',
      breed: 'Британская короткошёрстная',
      age: '1.5 года',
      shelter: 'Лапки',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
      video: 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
      gender: '♀ Девочка'
    },
    {
      name: 'Бобик',
      breed: 'Дворняга',
      age: '3 года',
      shelter: 'Четыре лапы',
      image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=300&fit=crop&crop=face',
      video: 'https://videos.pexels.com/video-files/3191207/3191207-sd_640_360_25fps.mp4',
      gender: '♂ Мальчик'
    },
    {
      name: 'Снежка',
      breed: 'Шотландская вислоухая',
      age: '8 месяцев',
      shelter: 'Дом для друга',
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
      video: 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
      gender: '♀ Девочка'
    },
    {
      name: 'Рекс',
      breed: 'Немецкая овчарка',
      age: '4 года',
      shelter: 'Добрые руки',
      image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop&crop=face',
      video: 'https://videos.pexels.com/video-files/4692212/4692212-sd_640_360_25fps.mp4',
      gender: '♂ Мальчик'
    },
    {
      name: 'Персик',
      breed: 'Рыжий метис',
      age: '6 месяцев',
      shelter: 'Лапки',
      image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop',
      video: 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
      gender: '♂ Мальчик'
    }
  ];

  onHover(name: string) {
    this.hoveredPet.set(name);
  }

  onLeave() {
    this.hoveredPet.set(null);
  }
}
