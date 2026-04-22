import { Component, OnInit } from '@angular/core';
import { ApiService, TeamMember } from '../../services/api.service';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.html',
  styleUrl: './team.css'
})
export class TeamComponent implements OnInit {
  members: TeamMember[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTeamMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (err) => {
        console.error('Ошибка загрузки команды:', err);
        // Fallback
        this.members = [
          {
            id: 1, name: 'Аджибаева Аделия', role: 'Project Manager & Frontend',
            responsibility: 'Управление проектом, Angular компоненты, дизайн',
            image: 'assets/images/adeli.jpg',
            color: '#F28B30', order: 1
          },
          {
            id: 2, name: 'Абуталифулы Ерали', role: 'Backend Developer',
            responsibility: 'Django REST API, база данных, серверная логика',
            image: 'assets/images/eraly.jpg',
            color: '#4AADA1', order: 2
          },
          {
            id: 3, name: 'Мейрамбек Жалгасбек', role: 'Frontend Developer',
            responsibility: 'Angular компоненты, стили, адаптивная вёрстка',
            image: 'assets/images/meir.png',
            color: '#F5C542', order: 3
          }
        ];
      }
    });
  }
}
