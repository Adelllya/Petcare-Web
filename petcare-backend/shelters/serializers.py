from rest_framework import serializers
from .models import Shelter


class ShelterSerializer(serializers.ModelSerializer):

    type_display = serializers.CharField(
        source='get_type_display',
        read_only=True
    )

    class Meta:
        model = Shelter
        fields = [
            'id',
            'name',
            'address',
            'phone',
            'type',
            'type_display',
            'description',
            'photo'
        ]