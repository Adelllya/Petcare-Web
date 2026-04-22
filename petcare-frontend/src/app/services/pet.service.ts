import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

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

export interface Favorite {
  id: number;
  pet: number;
  pet_detail: Pet;
  created_at: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

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

  adoptPet(petId: number): Observable<Pet> {
    return this.http.patch<Pet>(`${this.baseUrl}/pets/${petId}/`, { is_adopted: true }, this.httpOptions);
  }

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

  getShelters(): Observable<Shelter[]> {
    return this.http.get<PaginatedResponse<Shelter>>(`${this.baseUrl}/shelters/`).pipe(
      map(response => response.results)
    );
  }

  getShelter(id: number): Observable<Shelter> {
    return this.http.get<Shelter>(`${this.baseUrl}/shelters/${id}/`);
  }

  getStats(): Observable<ShelterStats> {
    return this.http.get<ShelterStats>(`${this.baseUrl}/stats/`);
  }

  submitContactForm(data: ContactForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact/`, data, this.httpOptions);
  }
}
