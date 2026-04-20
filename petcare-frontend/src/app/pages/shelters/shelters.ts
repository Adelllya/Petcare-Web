import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Shelter, CreateShelterForm } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shelters',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './shelters.html',
  styleUrl: './shelters.css'
})
export class SheltersComponent implements OnInit {
  shelters = signal<Shelter[]>([]);
  isLoading = signal(true);
  searchQuery = signal('');
  showCreateModal = signal(false);
  isCreating = signal(false);
  createError = signal('');
  createSuccess = signal('');

  // Форма создания приюта
  form: CreateShelterForm = {
    name: '',
    location: '',
    image: '',
    description: '',
    phone: '',
    email: '',
    tag: '',
  };

  // Фильтрованный список
  filteredShelters = computed(() => {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.shelters();
    return this.shelters().filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q)
    );
  });

  constructor(
    private api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.api.getShelters().subscribe({
      next: (data) => {
        this.shelters.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  openCreate() {
    if (!this.auth.isLoggedIn()) {
      alert('Войдите в аккаунт чтобы создать приют');
      return;
    }
    this.showCreateModal.set(true);
  }

  closeCreate() {
    this.showCreateModal.set(false);
    this.createError.set('');
    this.createSuccess.set('');
    this.form = { name: '', location: '', image: '', description: '', phone: '', email: '', tag: '' };
  }

  submitCreate() {
    if (!this.form.name || !this.form.location) {
      this.createError.set('Название и адрес обязательны');
      return;
    }
    this.isCreating.set(true);
    this.createError.set('');

    this.api.createShelter(this.form).subscribe({
      next: (newShelter) => {
        this.shelters.update(list => [newShelter, ...list]);
        this.isCreating.set(false);
        this.createSuccess.set('Приют успешно создан! 🎉');
        setTimeout(() => this.closeCreate(), 2000);
      },
      error: (err) => {
        this.isCreating.set(false);
        this.createError.set(err.error?.detail || 'Ошибка при создании. Проверьте данные.');
      }
    });
  }

  getRatingStars(rating: number): string {
    const full = Math.floor(Number(rating));
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}
