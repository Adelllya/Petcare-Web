import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Pet } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './pets.html',
  styleUrl: './pets.css'
})
export class PetsComponent implements OnInit {
  allPets: Pet[] = [];
  filteredPets: Pet[] = [];
  isLoading = signal(true);
  errorMessage = signal('');
  toastMessage = signal('');

  // ngModel filter controls (4 controls required by requirements)
  filterSpecies = '';        // ngModel #1
  filterGender = '';         // ngModel #2
  filterShelter = '';        // ngModel #3
  searchName = '';           // ngModel #4

  shelterOptions: string[] = [];

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.api.getPets().subscribe({
      next: (pets) => {
        this.allPets = pets;
        this.filteredPets = pets;
        // Build shelter dropdown list
        this.shelterOptions = [...new Set(pets.map(p => p.shelter_name))];
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Не удалось загрузить питомцев. Убедитесь, что бэкенд запущен.');
        this.isLoading.set(false);
      }
    });
  }

  // (click) event #1 — apply filters
  applyFilters() {
    this.filteredPets = this.allPets.filter(pet => {
      const matchSpecies = !this.filterSpecies || pet.species === this.filterSpecies;
      const matchGender  = !this.filterGender  || pet.gender  === this.filterGender;
      const matchShelter = !this.filterShelter || pet.shelter_name === this.filterShelter;
      const matchName    = !this.searchName    ||
        pet.name.toLowerCase().includes(this.searchName.toLowerCase());
      return matchSpecies && matchGender && matchShelter && matchName;
    });
  }

  // (click) event #2 — reset filters
  resetFilters() {
    this.filterSpecies = '';
    this.filterGender  = '';
    this.filterShelter = '';
    this.searchName    = '';
    this.filteredPets  = this.allPets;
  }

  // (click) event #3 — add to favourites
  toggleFavorite(pet: Pet) {
    if (!this.auth.isLoggedIn()) {
      this.showToast('Войдите, чтобы добавлять в избранное');
      return;
    }
    this.http.post(`${environment.apiUrl}/pets/${pet.id}/favorite/`, {}).subscribe({
      next: (res: any) => this.showToast(res.message),
      error: ()         => this.showToast('Ошибка при добавлении в избранное')
    });
  }

  // (click) event #4 — load api stats and show them as a toast
  loadStats() {
    this.http.get<any>(`${environment.apiUrl}/stats/`).subscribe({
      next: (s) => this.showToast(
        `🏠 ${s.shelters_count} приютов · 🐾 ${s.pets_count} ждут дом · ❤️ ${s.adopted_count} усыновлено`
      ),
      error: () => this.showToast('Не удалось загрузить статистику')
    });
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(''), 4000);
  }

  get availableCount(): number {
    return this.filteredPets.filter(p => !p.is_adopted).length;
  }
}
