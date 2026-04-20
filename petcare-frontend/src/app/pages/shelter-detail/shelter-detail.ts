import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Shelter, Pet } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shelter-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shelter-detail.html',
  styleUrl: './shelter-detail.css'
})
export class ShelterDetailComponent implements OnInit {
  shelter: Shelter | null = null;
  pets: Pet[] = [];
  isLoading = signal(true);
  favoriteMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getShelter(id).subscribe({
      next: (shelter) => {
        this.shelter = shelter;
      },
      error: () => {
        this.isLoading.set(false);
      }
    });

    this.api.getPetsByShelter(id).subscribe({
      next: (pets) => {
        this.pets = pets;
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  toggleFavorite(petId: number, petName: string) {
    if (!this.auth.isLoggedIn()) {
      this.favoriteMessage.set('Войдите чтобы добавлять в избранное');
      setTimeout(() => this.favoriteMessage.set(''), 3000);
      return;
    }

    this.http.post(`${environment.apiUrl}/pets/${petId}/favorite/`, {}).subscribe({
      next: (res: any) => {
        this.favoriteMessage.set(res.message);
        setTimeout(() => this.favoriteMessage.set(''), 3000);
      },
      error: () => {
        this.favoriteMessage.set('Ошибка при добавлении');
        setTimeout(() => this.favoriteMessage.set(''), 3000);
      }
    });
  }

  adoptPet(pet: Pet) {
    if (!this.auth.isLoggedIn()) {
      this.favoriteMessage.set('Войдите, чтобы приютить питомца');
      setTimeout(() => this.favoriteMessage.set(''), 3000);
      return;
    }

    const request = pet.is_adopted
      ? this.api.unadoptPet(pet.id)
      : this.api.adoptPet(pet.id);

    request.subscribe({
      next: (updatedPet) => {
        const index = this.pets.findIndex(p => p.id === pet.id);
        if (index !== -1) {
          this.pets[index] = updatedPet;
        }
        const msg = updatedPet.is_adopted ? `Ура! Вы приютили ${pet.name} 🏠` : `Статус отменен для ${pet.name}`;
        this.favoriteMessage.set(msg);
        setTimeout(() => this.favoriteMessage.set(''), 4000);
      },
      error: () => {
        this.favoriteMessage.set('Ошибка или недостаточно прав');
        setTimeout(() => this.favoriteMessage.set(''), 3000);
      }
    });
  }
}
