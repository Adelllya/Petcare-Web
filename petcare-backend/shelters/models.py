from django.db import models


class ShelterType(models.TextChoices):
    PRIVATE = 'private', 'Частный'
    STATE = 'state', 'Государственный'


class Shelter(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название")

    address = models.CharField(max_length=255, verbose_name="Адрес")

    phone = models.CharField(max_length=20, verbose_name="Телефон")

    type = models.CharField(
        max_length=20,
        choices=ShelterType.choices,
        default=ShelterType.PRIVATE,
        verbose_name="Тип приюта"
    )

    description = models.TextField(
        blank=True,
        verbose_name="Описание"
    )

    photo = models.ImageField(
        upload_to='shelters/',
        blank=True,
        null=True,
        verbose_name="Фото"
    )

    def __str__(self):
        return self.name