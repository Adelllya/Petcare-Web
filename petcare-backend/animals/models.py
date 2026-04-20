from django.db import models
from shelters.models import Shelter


class SpeciesChoices(models.TextChoices):
    CAT = 'cat', 'Кошка'
    DOG = 'dog', 'Собака'
    HAMSTER = 'hamster', 'Хомяк'
    RABBIT = 'rabbit', 'Кролик'


class GenderChoices(models.TextChoices):
    MALE = 'male', 'Самец'
    FEMALE = 'female', 'Самка'


class Pet(models.Model):
    shelter = models.ForeignKey(
        Shelter,
        on_delete=models.CASCADE,
        related_name='pets',
        verbose_name="Приют"
    )

    name = models.CharField(max_length=100, verbose_name="Кличка")

    species = models.CharField(
        max_length=20,
        choices=SpeciesChoices.choices,
        verbose_name="Вид"
    )

    breed = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Порода"
    )

    gender = models.CharField(
        max_length=10,
        choices=GenderChoices.choices,
        default=GenderChoices.MALE,
        verbose_name="Пол"
    )

    age = models.PositiveIntegerField(
        default=0,
        verbose_name="Возраст"
    )

    description = models.TextField(
        blank=True,
        verbose_name="Описание"
    )

    photo = models.ImageField(
        upload_to='pets/',
        blank=True,
        null=True,
        verbose_name="Фото"
    )

    def __str__(self):
        return f"{self.name} ({self.get_species_display()})"