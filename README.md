# 🐾 PetCare

## 🌟 Overview
PetCare is a web platform designed for pet owners, future pet owners, and anyone interested in animal care.

It combines an online pet shop with animal adoption features, helping users take better care of pets and support shelters.
This repository acts as the final submission for the KBTU Web Development requirements.

---

## 📋 Requirements Covered

### Front-End (Angular)
1. ✅ **Interfaces and Services:** `ApiService` and `AuthService` implemented communicating with backend.
2. ✅ **(click) Events:** Used across templates (e.g. `applyFilters`, `resetFilters`, `toggleFavorite`, `loadStats`).
3. ✅ **[(ngModel)] Controls:** 4 filters applied in the Pets page (`filterSpecies`, `filterGender`, `filterShelter`, `searchName`) as well as in Auth forms.
4. ✅ **CSS Styling:** Comprehensive, custom-styled cohesive UI.
5. ✅ **Routing:** `/` (Home), `/login`, `/pets`, and `/shelter/:id`.
6. ✅ **@for & @if:** Used angular 17+ syntax inside the `pets.html` and other templates.
7. ✅ **JWT Auth:** Auth interceptor (`auth.interceptor.ts`) along with Login/Logout flows setup.
8. ✅ **Angular Service & HttpClient:** Implemented specifically inside `api.service.ts` for DRF fetching.
9. ✅ **Error Handling:** Graceful catching within components alongside toasts & error banners.

### Back-End (Django + DRF)
1. ✅ **Models:** 6 models defined (`Shelter`, `Pet`, `TeamMember`, `Service`, `ContactMessage`, `Favorite`).
2. ✅ **Custom Managers:** Custom `AvailablePetManager` (returns non-adopted) and `TopRatedShelterManager` included.
3. ✅ **ForeignKey:** `Pet -> Shelter`, `Favorite -> User/Pet`, `ContactMessage -> User`.
4. ✅ **Serializers:** 2 Plain (`LoginSerializer`, `RegisterSerializer`) & ModelSerializers for database models.
5. ✅ **Views:** 2 FBV (`api_stats`, `toggle_favorite`) & 3 CBV APIViews (`LoginView`, `RegisterView`, `LogoutView`).
6. ✅ **Token-based DB Auth:** Simple JWT handles authentication, endpoints present.
7. ✅ **CRUD Operations:** Complete capabilities established inside `ShelterViewSet` and `PetViewSet`.
8. ✅ **Link to Auth User:** Favorites and Contact Messages append `request.user` to newly created objects.
9. ✅ **CORS:** Allowed for the Angular frontend `CORS_ALLOW_ALL_ORIGINS = True`.
10. ✅ **Postman Collection:** `PetCare_API.postman_collection.json` inside the root workspace folder.

---

## 🛠 Tech Stack
- **Frontend:** Angular 19
- **Backend:** Django 4.2 + Django REST Framework
- **Database:** SQLite
- **Version Control:** GitHub

---

## 👥 Team Members
- Ajibayeva Adeliya  
- Abutalifuly Eraly  
- Meirambek Zhalgasbek  

---

## 📌 Start Commands

**Backend:**
```bash
cd petcare-backend
python manage.py runserver
```

**Frontend:**
```bash
cd petcare-frontend
npm install
npm run start
```
