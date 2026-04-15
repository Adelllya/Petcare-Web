from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Shelter, Pet, TeamMember, Service, ContactMessage, Favorite


# ============================================================
# Plain Serializers (serializers.Serializer) — 2 штуки минимум
# ============================================================

class LoginSerializer(serializers.Serializer):
    """Сериализатор для входа (plain Serializer, не ModelSerializer)"""
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128, write_only=True)


class RegisterSerializer(serializers.Serializer):
    """Сериализатор для регистрации (plain Serializer)"""
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    password_confirm = serializers.CharField(max_length=128, write_only=True)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Пользователь с таким именем уже существует')
        return value

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Пароли не совпадают'})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


# ============================================================
# Model Serializers (serializers.ModelSerializer) — 2+ штуки
# ============================================================

class ShelterSerializer(serializers.ModelSerializer):
    """Сериализатор для приютов"""
    class Meta:
        model = Shelter
        fields = [
            'id', 'name', 'location', 'image',
            'pet_count', 'rating', 'tag',
            'description', 'phone', 'email', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class PetSerializer(serializers.ModelSerializer):
    """Сериализатор для питомцев"""
    shelter_name = serializers.CharField(source='shelter.name', read_only=True)
    gender_display = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Pet
        fields = [
            'id', 'name', 'breed', 'age', 'species', 'gender',
            'gender_display', 'shelter', 'shelter_name',
            'image', 'video', 'description', 'is_adopted',
            'is_favorited', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def get_gender_display(self, obj):
        symbols = {'male': '♂ Мальчик', 'female': '♀ Девочка'}
        return symbols.get(obj.gender, obj.gender)

    def get_is_favorited(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, pet=obj).exists()
        return False


class TeamMemberSerializer(serializers.ModelSerializer):
    """Сериализатор для команды"""
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'responsibility', 'image', 'color', 'order']
        read_only_fields = ['id']


class ServiceSerializer(serializers.ModelSerializer):
    """Сериализатор для шагов (как это работает)"""
    class Meta:
        model = Service
        fields = ['id', 'number', 'icon', 'title', 'description', 'order']
        read_only_fields = ['id']


class ContactMessageSerializer(serializers.ModelSerializer):
    """Сериализатор для формы обратной связи"""
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class FavoriteSerializer(serializers.ModelSerializer):
    """Сериализатор для избранного"""
    pet_detail = PetSerializer(source='pet', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'pet', 'pet_detail', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
