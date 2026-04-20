import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Shelter, Pet, CreateShelterForm, CreatePetForm, Favorite } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

type Tab = 'overview' | 'favorites' | 'my-shelters' | 'add-shelter' | 'add-pet';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  activeTab = signal<Tab>('overview');
  isLoading = signal(true);

  // Данные
  favorites = signal<Favorite[]>([]);
  myShelters = signal<Shelter[]>([]);
  stats = signal({ shelters_count: 0, pets_count: 0, adopted_count: 0, total_pets: 0 });

  // Уведомления
  message = signal('');
  messageType = signal<'success' | 'error'>('success');

  // Форма — создать приют
  shelterForm: CreateShelterForm = {
    name: '', location: '', image: '',
    description: '', phone: '', email: '', tag: ''
  };
  shelterFormLoading = signal(false);

  // Форма — добавить питомца
  petForm: CreatePetForm = {
    name: '', breed: '', age: '', species: 'dog',
    gender: 'male', shelter: 0, image: '', description: ''
  };
  petFormLoading = signal(false);

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);

    // Статистика
    this.api.getStats().subscribe({
      next: (s) => this.stats.set(s),
      error: () => {}
    });

    // Избранное
    this.api.getFavorites().subscribe({
      next: (favs) => {
        this.favorites.set(favs);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });

    // Все приюты (для кабинета — показываем все, нет поля owner в API)
    this.api.getShelters().subscribe({
      next: (shelters) => this.myShelters.set(shelters),
      error: () => {}
    });
  }

  setTab(tab: Tab) {
    this.activeTab.set(tab);
    this.message.set('');
  }

  // ──────────────── Избранное ────────────────
  removeFavorite(petId: number) {
    this.api.removeFavorite(petId).subscribe({
      next: () => {
        this.favorites.update(list => list.filter(f => f.pet !== petId));
        this.showMsg('Удалено из избранного', 'success');
      },
      error: () => this.showMsg('Ошибка при удалении', 'error')
    });
  }

  // ──────────────── Приютить / отменить ────────────────
  adoptPet(pet: Pet) {
    const call = pet.is_adopted
      ? this.api.unadoptPet(pet.id)
      : this.api.adoptPet(pet.id);

    call.subscribe({
      next: (updated) => {
        // Обновляем в списке избранного
        this.favorites.update(list =>
          list.map(f => f.pet === pet.id
            ? { ...f, pet_detail: updated }
            : f
          )
        );
        const msg = updated.is_adopted ? `${pet.name} усыновлён 🏠` : `${pet.name} снова ищет дом`;
        this.showMsg(msg, 'success');
      },
      error: () => this.showMsg('Ошибка. Возможно нет прав.', 'error')
    });
  }

  // ──────────────── Создать приют ────────────────
  submitShelter() {
    if (!this.shelterForm.name || !this.shelterForm.location) {
      this.showMsg('Название и адрес обязательны', 'error');
      return;
    }
    this.shelterFormLoading.set(true);
    this.api.createShelter(this.shelterForm).subscribe({
      next: (shelter) => {
        this.myShelters.update(list => [shelter, ...list]);
        this.shelterFormLoading.set(false);
        this.showMsg(`Приют «${shelter.name}» создан! 🎉`, 'success');
        this.shelterForm = { name: '', location: '', image: '', description: '', phone: '', email: '', tag: '' };
        setTimeout(() => this.setTab('my-shelters'), 1500);
      },
      error: (err) => {
        this.shelterFormLoading.set(false);
        this.showMsg(err.error?.detail || 'Ошибка при создании приюта', 'error');
      }
    });
  }

  // ──────────────── Добавить питомца ────────────────
  submitPet() {
    if (!this.petForm.name || !this.petForm.shelter) {
      this.showMsg('Имя питомца и приют обязательны', 'error');
      return;
    }
    this.petFormLoading.set(true);
    this.api.createPet(this.petForm).subscribe({
      next: (pet) => {
        this.petFormLoading.set(false);
        this.showMsg(`Питомец «${pet.name}» добавлен! 🐾`, 'success');
        this.petForm = { name: '', breed: '', age: '', species: 'dog', gender: 'male', shelter: 0, image: '', description: '' };
      },
      error: (err) => {
        this.petFormLoading.set(false);
        this.showMsg(err.error?.detail || 'Ошибка при добавлении питомца', 'error');
      }
    });
  }

  private showMsg(text: string, type: 'success' | 'error') {
    this.message.set(text);
    this.messageType.set(type);
    setTimeout(() => this.message.set(''), 4000);
  }
}
