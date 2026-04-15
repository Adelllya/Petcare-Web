from django.db import models
from django.contrib.auth.models import User


# ============================================================
# Custom Model Managers
# ============================================================

class AvailablePetManager(models.Manager):
    """Custom manager: возвращает только питомцев, которые ещё не усыновлены."""
    def get_queryset(self):
        return super().get_queryset().filter(is_adopted=False)

    def by_species(self, species: str):
        """Дополнительный метод: фильтр по виду животного."""
        return self.get_queryset().filter(species=species)


class TopRatedShelterManager(models.Manager):
    """Custom manager: возвращает приюты с рейтингом >= 4.5, отсортированные по рейтингу."""
    def get_queryset(self):
        return super().get_queryset().filter(rating__gte=4.5).order_by('-rating')


class Shelter(models.Model):
    """Приют для животных"""
    name = models.CharField(max_length=200, verbose_name='Название')
    location = models.CharField(max_length=300, verbose_name='Адрес')
    image = models.URLField(verbose_name='Фото (URL)')
    pet_count = models.PositiveIntegerField(default=0, verbose_name='Кол-во питомцев')
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0, verbose_name='Рейтинг')
    tag = models.CharField(max_length=100, blank=True, verbose_name='Тег')
    description = models.TextField(blank=True, verbose_name='Описание')
    phone = models.CharField(max_length=20, blank=True, verbose_name='Телефон')
    email = models.EmailField(blank=True, verbose_name='Email')
    created_at = models.DateTimeField(auto_now_add=True)

    # Custom manager — приюты с рейтингом >= 4.5
    objects = models.Manager()          # стандартный менеджер остаётся первым
    top_rated = TopRatedShelterManager()

    class Meta:
        verbose_name = 'Приют'
        verbose_name_plural = 'Приюты'
        ordering = ['-rating']

    def __str__(self):
        return self.name


class Pet(models.Model):
    """Питомец в приюте"""
    GENDER_CHOICES = [
        ('male', 'Мальчик'),
        ('female', 'Девочка'),
    ]
    SPECIES_CHOICES = [
        ('dog', 'Собака'),
        ('cat', 'Кошка'),
        ('other', 'Другое'),
    ]

    name = models.CharField(max_length=100, verbose_name='Кличка')
    breed = models.CharField(max_length=200, verbose_name='Порода')
    age = models.CharField(max_length=50, verbose_name='Возраст')
    species = models.CharField(max_length=10, choices=SPECIES_CHOICES, default='dog', verbose_name='Вид')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male', verbose_name='Пол')
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, related_name='pets', verbose_name='Приют')
    image = models.URLField(verbose_name='Фото (URL)')
    video = models.URLField(blank=True, verbose_name='Видео (URL)')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_adopted = models.BooleanField(default=False, verbose_name='Усыновлён')
    created_at = models.DateTimeField(auto_now_add=True)

    # Custom managers
    objects   = models.Manager()         # стандартный менеджер
    available = AvailablePetManager()    # только не усыновлённые

    class Meta:
        verbose_name = 'Питомец'
        verbose_name_plural = 'Питомцы'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.breed})'


class TeamMember(models.Model):
    """Член команды проекта"""
    name = models.CharField(max_length=200, verbose_name='Имя')
    role = models.CharField(max_length=200, verbose_name='Роль')
    responsibility = models.TextField(verbose_name='Обязанности')
    image = models.URLField(verbose_name='Фото (URL)')
    color = models.CharField(max_length=7, default='#4AADA1', verbose_name='Цвет акцента')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')

    class Meta:
        verbose_name = 'Член команды'
        verbose_name_plural = 'Команда'
        ordering = ['order']

    def __str__(self):
        return self.name


class Service(models.Model):
    """Услуга платформы (как это работает — шаги)"""
    number = models.CharField(max_length=5, verbose_name='Номер шага')
    icon = models.CharField(max_length=10, verbose_name='Иконка (эмодзи)')
    title = models.CharField(max_length=200, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')

    class Meta:
        verbose_name = 'Шаг / Услуга'
        verbose_name_plural = 'Шаги / Услуги'
        ordering = ['order']

    def __str__(self):
        return f'{self.number}. {self.title}'


class ContactMessage(models.Model):
    """Сообщение из формы обратной связи"""
    name = models.CharField(max_length=200, verbose_name='Имя')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    message = models.TextField(verbose_name='Сообщение')
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='messages', verbose_name='Пользователь'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False, verbose_name='Прочитано')

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.created_at:%d.%m.%Y %H:%M}'


class Favorite(models.Model):
    """Избранный питомец пользователя"""
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='favorites', verbose_name='Пользователь'
    )
    pet = models.ForeignKey(
        Pet, on_delete=models.CASCADE,
        related_name='favorited_by', verbose_name='Питомец'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Избранное'
        verbose_name_plural = 'Избранное'
        unique_together = ['user', 'pet']
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} ❤️ {self.pet.name}'

