from django.core.management.base import BaseCommand
from shelters.models import Shelter, Pet, TeamMember, Service


class Command(BaseCommand):
    help = 'Заполняет БД начальными данными для PetCare платформы'

    def handle(self, *args, **options):
        self.stdout.write('Заполняю базу данных...')

        # ===== Приюты =====
        shelters_data = [
            {
                'name': 'Добрые руки',
                'location': 'Алматы, Медеуский р-н',
                'image': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=250&fit=crop',
                'pet_count': 45,
                'rating': 4.9,
                'tag': '⭐ Лучший',
                'description': 'Один из крупнейших приютов Алматы. Работаем с 2015 года.',
                'phone': '+7 (727) 123-45-67',
                'email': 'dobrye-ruki@petcare.kz',
            },
            {
                'name': 'Лапки',
                'location': 'Алматы, Алмалинский р-н',
                'image': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
                'pet_count': 32,
                'rating': 4.8,
                'tag': '📍 Рядом',
                'description': 'Небольшой уютный приют в центре города.',
                'phone': '+7 (727) 234-56-78',
                'email': 'lapki@petcare.kz',
            },
            {
                'name': 'Четыре лапы',
                'location': 'Алматы, Бостандыкский р-н',
                'image': 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=250&fit=crop',
                'pet_count': 67,
                'rating': 4.7,
                'tag': '🐾 Много питомцев',
                'description': 'Самый большой приют в городе — более 60 питомцев!',
                'phone': '+7 (727) 345-67-89',
                'email': 'four-paws@petcare.kz',
            },
            {
                'name': 'Дом для друга',
                'location': 'Нур-Султан, Есильский р-н',
                'image': 'https://images.unsplash.com/photo-1556866261-8763a7662333?w=400&h=250&fit=crop',
                'pet_count': 28,
                'rating': 4.6,
                'tag': '🆕 Новый',
                'description': 'Новый приют в столице, открыт в 2024 году.',
                'phone': '+7 (717) 456-78-90',
                'email': 'dom-druga@petcare.kz',
            },
        ]

        shelters = {}
        for data in shelters_data:
            s, created = Shelter.objects.get_or_create(name=data['name'], defaults=data)
            shelters[data['name']] = s
            status = 'создан' if created else 'уже есть'
            self.stdout.write(f'  Приют "{s.name}" — {status}')

        # ===== Питомцы =====
        pets_data = [
            {
                'name': 'Джек',
                'breed': 'Джек-рассел-терьер',
                'age': '2 года',
                'species': 'dog',
                'gender': 'male',
                'shelter': shelters['Добрые руки'],
                'image': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=face',
                'video': 'https://videos.pexels.com/video-files/4692212/4692212-sd_640_360_25fps.mp4',
            },
            {
                'name': 'Мурка',
                'breed': 'Британская короткошёрстная',
                'age': '1.5 года',
                'species': 'cat',
                'gender': 'female',
                'shelter': shelters['Лапки'],
                'image': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
                'video': 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
            },
            {
                'name': 'Бобик',
                'breed': 'Дворняга',
                'age': '3 года',
                'species': 'dog',
                'gender': 'male',
                'shelter': shelters['Четыре лапы'],
                'image': 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=300&fit=crop&crop=face',
                'video': 'https://videos.pexels.com/video-files/3191207/3191207-sd_640_360_25fps.mp4',
            },
            {
                'name': 'Снежка',
                'breed': 'Шотландская вислоухая',
                'age': '8 месяцев',
                'species': 'cat',
                'gender': 'female',
                'shelter': shelters['Дом для друга'],
                'image': 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
                'video': 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
            },
            {
                'name': 'Рекс',
                'breed': 'Немецкая овчарка',
                'age': '4 года',
                'species': 'dog',
                'gender': 'male',
                'shelter': shelters['Добрые руки'],
                'image': 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop&crop=face',
                'video': 'https://videos.pexels.com/video-files/4692212/4692212-sd_640_360_25fps.mp4',
            },
            {
                'name': 'Персик',
                'breed': 'Рыжий метис',
                'age': '6 месяцев',
                'species': 'cat',
                'gender': 'male',
                'shelter': shelters['Лапки'],
                'image': 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop',
                'video': 'https://videos.pexels.com/video-files/855029/855029-sd_640_360_24fps.mp4',
            },
        ]

        for data in pets_data:
            p, created = Pet.objects.get_or_create(name=data['name'], shelter=data['shelter'], defaults=data)
            status = 'создан' if created else 'уже есть'
            self.stdout.write(f'  Питомец "{p.name}" — {status}')

        # ===== Команда =====
        team_data = [
            {
                'name': 'Аджибаева Аделия',
                'role': 'Project Manager & Frontend',
                'responsibility': 'Управление проектом, Angular компоненты, дизайн',
                'image': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
                'color': '#F28B30',
                'order': 1,
            },
            {
                'name': 'Абуталифулы Ерали',
                'role': 'Backend Developer',
                'responsibility': 'Django REST API, база данных, серверная логика',
                'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
                'color': '#4AADA1',
                'order': 2,
            },
            {
                'name': 'Мейрамбек Жалгасбек',
                'role': 'Frontend Developer',
                'responsibility': 'Angular компоненты, стили, адаптивная вёрстка',
                'image': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
                'color': '#F5C542',
                'order': 3,
            },
        ]

        for data in team_data:
            t, created = TeamMember.objects.get_or_create(name=data['name'], defaults=data)
            status = 'создан' if created else 'уже есть'
            self.stdout.write(f'  Участник "{t.name}" — {status}')

        # ===== Шаги (как это работает) =====
        steps_data = [
            {
                'number': '01',
                'icon': '🔍',
                'title': 'Выбери приют',
                'description': 'Просматривай список приютов в своём городе, читай отзывы и рейтинги',
                'order': 1,
            },
            {
                'number': '02',
                'icon': '📹',
                'title': 'Познакомься с питомцем',
                'description': 'Наведи на карточку — увидишь видео с животным. Посмотри, как он живёт',
                'order': 2,
            },
            {
                'number': '03',
                'icon': '📞',
                'title': 'Свяжись с приютом',
                'description': 'Напиши или позвони приюту напрямую. Договорись о встрече с питомцем',
                'order': 3,
            },
            {
                'number': '04',
                'icon': '❤️',
                'title': 'Забери домой',
                'description': 'Приезжай, познакомься лично и подари питомцу его новый дом',
                'order': 4,
            },
        ]

        for data in steps_data:
            s, created = Service.objects.get_or_create(number=data['number'], defaults=data)
            status = 'создан' if created else 'уже есть'
            self.stdout.write(f'  Шаг "{s.title}" — {status}')

        self.stdout.write(self.style.SUCCESS('\n✅ База данных заполнена!'))
