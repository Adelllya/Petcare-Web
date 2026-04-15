# 📗 PetCare — Руководство для Angular разработчика

## 📋 Содержание
1. [Начало работы](#начало-работы)
2. [Структура проекта](#структура-проекта)
3. [Дизайн-система](#дизайн-система)
4. [Компоненты](#компоненты)
5. [API сервис](#api-сервис)
6. [Добавление новых компонентов](#добавление-новых-компонентов)
7. [Сборка и деплой](#сборка-и-деплой)

---

## 🚀 Начало работы

### Требования
- Node.js 18+ (рекомендуется 20+)
- npm 9+
- Angular CLI 21+

### Установка

```bash
# Клонируем репозиторий
git clone https://github.com/Adelllya/Petcare-Web.git
cd Petcare-Web/petcare-frontend

# Устанавливаем зависимости
npm install

# Запускаем dev-сервер
npm start
# или
npx ng serve
```

Приложение доступно по адресу: `http://localhost:4200/`

---

## 📂 Структура проекта

```
petcare-frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Все компоненты лендинга
│   │   │   ├── header/          # Навигация (sticky, glassmorphism)
│   │   │   ├── hero/            # Главный экран
│   │   │   ├── stats/           # Счётчики с анимацией
│   │   │   ├── about/           # О нас
│   │   │   ├── services/        # Услуги (4 карточки)
│   │   │   ├── team/            # Команда (3 участника)
│   │   │   ├── why-us/          # Почему мы (4 причины)
│   │   │   ├── testimonials/    # Отзывы (карусель)
│   │   │   ├── contact/         # Контакты + форма
│   │   │   └── footer/          # Подвал
│   │   │
│   │   ├── services/
│   │   │   └── api.service.ts   # HTTP сервис для Django API
│   │   │
│   │   ├── app.ts               # Root компонент
│   │   ├── app.html             # Root шаблон
│   │   ├── app.css              # Root стили
│   │   ├── app.config.ts        # Конфигурация (router, http)
│   │   └── app.routes.ts        # Маршруты
│   │
│   ├── environments/
│   │   ├── environment.ts       # Dev: apiUrl = localhost:8000
│   │   └── environment.prod.ts  # Prod: apiUrl = /api
│   │
│   ├── styles.css               # Глобальные стили (дизайн-система)
│   └── index.html               # Точка входа (SEO, шрифты)
│
├── public/                      # Статика (логотип, favicon)
├── angular.json                 # Конфигурация Angular
├── package.json                 # Зависимости
└── tsconfig.json                # TypeScript конфигурация
```

---

## 🎨 Дизайн-система

Все дизайн-токены определены как CSS-переменные в `src/styles.css`:

### Цвета

| Переменная | Цвет | Использование |
|---|---|---|
| `--color-primary` | `#4AADA1` (бирюза) | Основной цвет, ссылки |
| `--color-accent` | `#F28B30` (оранж) | Кнопки CTA, акценты |
| `--color-bg` | `#FFFAF5` | Фон страницы |
| `--color-bg-warm` | `#FFF3E6` | Фон разделов |
| `--color-dark` | `#2D2D2D` | Текст |

### Шрифты
- **Outfit** (`--font-display`) — заголовки, кнопки, навигация
- **Inter** (`--font-body`) — основной текст

### Анимации
Доступные CSS-классы анимаций:
- `.animate-fade-in-up` — появление снизу
- `.animate-fade-in-left` — появление слева
- `.animate-fade-in-right` — появление справа  
- `.animate-float` — плавание (для декоративных элементов)

### Утилиты
- `.container` — центрированный контейнер (max 1200px)
- `.section` — стандартный отступ секции (96px)
- `.btn` / `.btn-primary` / `.btn-secondary` — кнопки
- `.card` — карточка с тенью и hover-эффектом

---

## 🧩 Компоненты

Все компоненты — **standalone** (Angular 21). Каждый компонент:
- `component.ts` — логика
- `component.html` — шаблон
- `component.css` — стили (ViewEncapsulation по умолчанию)

### Как подключить компонент

```typescript
// В parent component
import { MyComponent } from './components/my-component/my-component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [MyComponent],  // просто добавь в imports
  template: '<app-my-component />'
})
```

### Особенности компонентов

| Компонент | Фишка |
|---|---|
| **Header** | Sticky + glassmorphism при прокрутке |
| **Hero** | Floating cards, paw decorations |
| **Stats** | IntersectionObserver + animated counters |
| **About** | Experience badge с пульсацией |
| **Services** | Gradient top border reveal on hover |
| **Team** | Avatar gradient ring |
| **Why-Us** | Numbered cards (01-04) |
| **Testimonials** | Carousel с dots navigation |
| **Contact** | Form с ngModel + success animation |
| **Footer** | 4-column grid, dark theme |

---

## 🔌 API сервис

Файл: `src/app/services/api.service.ts`

### Доступные методы

```typescript
import { ApiService } from './services/api.service';

// Инжектируем сервис
constructor(private api: ApiService) {}

// Получить всех питомцев
this.api.getPets().subscribe(pets => { ... });

// Получить товары
this.api.getProducts().subscribe(products => { ... });

// Отправить форму контакта
this.api.submitContactForm({ name, phone, message }).subscribe();
```

### TypeScript интерфейсы

Все интерфейсы уже определены и соответствуют будущим Django моделям:
- `Pet` — животное для усыновления
- `Product` — товар зоомагазина
- `TeamMember` — участник команды
- `Testimonial` — отзыв клиента
- `ContactForm` — форма обратной связи
- `Service` — услуга

---

## ➕ Добавление новых компонентов

```bash
# Через Angular CLI
npx ng generate component components/new-component --standalone

# Или вручную — создай 3 файла:
# src/app/components/new-component/new-component.ts
# src/app/components/new-component/new-component.html
# src/app/components/new-component/new-component.css
```

Затем добавь в `app.ts`:
```typescript
import { NewComponent } from './components/new-component/new-component';

@Component({
  imports: [..., NewComponent],
})
```

---

## 🏗 Сборка и деплой

### Development
```bash
npm start                    # Запуск dev-сервера
npx ng serve --port 4201     # На другом порту
```

### Production build
```bash
npm run build
# Результат в: dist/petcare-frontend/browser/
```

### Интеграция с Django
Собранные файлы из `dist/` копируются в Django `static/` директорию.
Подробнее — в `DJANGO_GUIDE.md`.

---

## 📝 Полезные команды

```bash
npx ng build                          # Production build
npx ng serve                          # Dev server
npx ng generate component NAME        # Новый компонент
npx ng test                           # Запуск тестов
npx ng lint                           # Линтер
```
