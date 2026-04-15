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
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
            color: '#F28B30', order: 1
          },
          {
            id: 2, name: 'Абуталифулы Ерали', role: 'Backend Developer',
            responsibility: 'Django REST API, база данных, серверная логика',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
            color: '#4AADA1', order: 2
          },
          {
            id: 3, name: 'Мейрамбек Жалгасбек', role: 'Frontend Developer',
            responsibility: 'Angular компоненты, стили, адаптивная вёрстка',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
            color: '#F5C542', order: 3
          }
        ];
      }
    });
  }
}
