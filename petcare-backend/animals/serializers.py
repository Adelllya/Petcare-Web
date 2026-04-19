from rest_framework import serializers
from .models import Pet


class PetSerializer(serializers.ModelSerializer):

    species_display = serializers.CharField(
        source='get_species_display',
        read_only=True
    )

    gender_display = serializers.CharField(
        source='get_gender_display',
        read_only=True
    )

    shelter_name = serializers.CharField(
        source='shelter.name',
        read_only=True
    )

    class Meta:
        model = Pet
        fields = [
            'id',
            'name',
            'species',
            'species_display',
            'breed',
            'gender',
            'gender_display',
            'age',
            'description',
            'photo',
            'shelter',
            'shelter_name'
        ]