import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

// ============================================
// TypeScript интерфейсы — соответствуют Django моделям
// ============================================

export interface Shelter {
  id: number;
  name: string;
  location: string;
  image: string;
  pet_count: number;
  rating: number;
  tag: string;
  description: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  species: string;
  gender: string;
  gender_display: string;
  shelter: number;
  shelter_name: string;
  image: string;
  video: string;
  description: string;
  is_adopted: boolean;
  created_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  responsibility: string;
  image: string;
  color: string;
  order: number;
}

export interface Service {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface ContactForm {
  name: string;
  phone: string;
  message: string;
}

export interface ShelterStats {
  shelters_count: number;
  pets_count: number;
  adopted_count: number;
  total_pets: number;
}

export interface CreateShelterForm {
  name: string;
  location: string;
  image: string;
  description: string;
  phone: string;
  email: string;
  tag: string;
}

export interface CreatePetForm {
  name: string;
  breed: string;
  age: string;
  species: string;
  gender: string;
  shelter: number;
  image: string;
  description: string;
}

export interface Favorite {
  id: number;
  pet: number;
  pet_detail: Pet;
  created_at: string;
}

// DRF paginated response wrapper
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ============================================
// API Service — подключён к Django REST Framework
// ============================================

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // --- Приюты ---
  getShelters(): Observable<Shelter[]> {
    return this.http.get<PaginatedResponse<Shelter>>(`${this.baseUrl}/shelters/`).pipe(
      map(response => response.results)
    );
  }

  getShelter(id: number): Observable<Shelter> {
    return this.http.get<Shelter>(`${this.baseUrl}/shelters/${id}/`);
  }

  // --- Питомцы ---
  getPets(): Observable<Pet[]> {
    return this.http.get<PaginatedResponse<Pet>>(`${this.baseUrl}/pets/`).pipe(
      map(response => response.results)
    );
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/pets/${id}/`);
  }

  getPetsByShelter(shelterId: number): Observable<Pet[]> {
    return this.http.get<PaginatedResponse<Pet>>(`${this.baseUrl}/pets/?shelter=${shelterId}`).pipe(
      map(response => response.results)
    );
  }

  // --- Команда ---
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<PaginatedResponse<TeamMember>>(`${this.baseUrl}/team/`).pipe(
      map(response => response.results)
    );
  }

  // --- Шаги (Services) ---
  getServices(): Observable<Service[]> {
    return this.http.get<PaginatedResponse<Service>>(`${this.baseUrl}/services/`).pipe(
      map(response => response.results)
    );
  }

  // --- Форма обратной связи ---
  submitContactForm(data: ContactForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact/`, data, this.httpOptions);
  }

  // --- Статистика платформы ---
  getStats(): Observable<ShelterStats> {
    return this.http.get<ShelterStats>(`${this.baseUrl}/stats/`);
  }

  // --- Создать приют ---
  createShelter(data: CreateShelterForm): Observable<Shelter> {
    return this.http.post<Shelter>(`${this.baseUrl}/shelters/`, data, this.httpOptions);
  }

  // --- Создать питомца ---
  createPet(data: CreatePetForm): Observable<Pet> {
    return this.http.post<Pet>(`${this.baseUrl}/pets/`, data, this.httpOptions);
  }

  // --- Пометить питомца усыновлённым / отменить ---
  adoptPet(petId: number): Observable<Pet> {
    return this.http.patch<Pet>(`${this.baseUrl}/pets/${petId}/`, { is_adopted: true }, this.httpOptions);
  }

  unadoptPet(petId: number): Observable<Pet> {
    return this.http.patch<Pet>(`${this.baseUrl}/pets/${petId}/`, { is_adopted: false }, this.httpOptions);
  }

  // --- Избранное ---
  getFavorites(): Observable<Favorite[]> {
    return this.http.get<{ count: number; results: Favorite[] }>(`${this.baseUrl}/favorites/`).pipe(
      map(r => r.results)
    );
  }

  addFavorite(petId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/pets/${petId}/favorite/`, {}, this.httpOptions);
  }

  removeFavorite(petId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pets/${petId}/favorite/`, this.httpOptions);
  }
}
