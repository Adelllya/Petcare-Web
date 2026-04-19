import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ============================================
// TypeScript interfaces matching Django models
// ============================================

export interface Pet {
  id: number;
  name: string;
  species: string;  // 'dog' | 'cat' | 'other'
  breed: string;
  age: number;
  description: string;
  image: string;
  is_adopted: boolean;
  shelter_name: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  in_stock: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_avatar: string;
  pet_type: string;
  rating: number;
  text: string;
  created_at: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  message: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ============================================
// API Service — Django REST Framework ready
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

  // --- Pets ---
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.baseUrl}/pets/`);
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/pets/${id}/`);
  }

  // --- Products ---
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}/`);
  }

  // --- Team ---
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.baseUrl}/team/`);
  }

  // --- Testimonials ---
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.baseUrl}/testimonials/`);
  }

  // --- Services ---
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}/services/`);
  }

  // --- Contact Form ---
  submitContactForm(data: ContactForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact/`, data, this.httpOptions);
  }
}
