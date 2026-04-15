from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Shelter, Pet, TeamMember, Service, ContactMessage, Favorite
from .serializers import (
    ShelterSerializer, PetSerializer, TeamMemberSerializer,
    ServiceSerializer, ContactMessageSerializer, FavoriteSerializer,
    LoginSerializer, RegisterSerializer
)


# ============================================================
# Function-Based Views (FBV) с декораторами — 2 штуки минимум
# ============================================================

@api_view(['GET'])
@permission_classes([AllowAny])
def api_stats(request):
    """
    FBV #1: Возвращает общую статистику платформы.
    GET /api/stats/
    """
    stats = {
        'shelters_count': Shelter.objects.count(),
        'pets_count': Pet.objects.filter(is_adopted=False).count(),
        'adopted_count': Pet.objects.filter(is_adopted=True).count(),
        'total_pets': Pet.objects.count(),
    }
    return Response(stats)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def toggle_favorite(request, pet_id):
    """
    FBV #2: Добавить/удалить питомца из избранного.
    POST /api/pets/<id>/favorite/ — добавить
    DELETE /api/pets/<id>/favorite/ — удалить
    Привязывается к request.user
    """
    try:
        pet = Pet.objects.get(pk=pet_id)
    except Pet.DoesNotExist:
        return Response(
            {'error': 'Питомец не найден'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'POST':
        fav, created = Favorite.objects.get_or_create(
            user=request.user,
            pet=pet
        )
        if created:
            return Response(
                {'status': 'added', 'message': f'{pet.name} добавлен в избранное'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'status': 'exists', 'message': 'Уже в избранном'},
            status=status.HTTP_200_OK
        )

    elif request.method == 'DELETE':
        deleted, _ = Favorite.objects.filter(
            user=request.user, pet=pet
        ).delete()
        if deleted:
            return Response(
                {'status': 'removed', 'message': f'{pet.name} удалён из избранного'},
                status=status.HTTP_200_OK
            )
        return Response(
            {'status': 'not_found', 'message': 'Не был в избранном'},
            status=status.HTTP_404_NOT_FOUND
        )


# ============================================================
# Class-Based Views (CBV) с APIView — 2 штуки минимум
# ============================================================

class LoginView(APIView):
    """
    CBV #1: Аутентификация пользователя — возвращает JWT токен.
    POST /api/auth/login/
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )

        if user is None:
            return Response(
                {'error': 'Неверный логин или пароль'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        })


class RegisterView(APIView):
    """
    CBV #2: Регистрация нового пользователя.
    POST /api/auth/register/
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    """
    CBV #3: Выход пользователя (Logout).
    POST /api/auth/logout/
    """
    permission_classes = [AllowAny]

    def post(self, request):
        # Реализация выхода на сервере. При использовании JWT, обычно удаляется токен на клиенте,
        # либо refresh токен добавляется в blacklist. Возвращаем успешный статус.
        return Response({"status": "success", "message": "Успешный выход"}, status=status.HTTP_200_OK)


# ============================================================
# ViewSets (ModelViewSet) — CRUD
# ============================================================

class ShelterViewSet(viewsets.ModelViewSet):
    """
    ViewSet для управления приютами.
    GET /api/shelters/ — список всех приютов
    GET /api/shelters/{id}/ — конкретный приют
    POST/PUT/DELETE — CRUD
    """
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    permission_classes = [AllowAny]


class PetViewSet(viewsets.ModelViewSet):
    """
    ViewSet для управления питомцами (полный CRUD).
    GET /api/pets/ — список питомцев (можно фильтровать)
    GET /api/pets/{id}/ — конкретный питомец
    POST /api/pets/ — создать (требует auth)
    PUT/PATCH /api/pets/{id}/ — обновить
    DELETE /api/pets/{id}/ — удалить
    """
    queryset = Pet.objects.select_related('shelter').all()
    serializer_class = PetSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        shelter_id = self.request.query_params.get('shelter')
        species = self.request.query_params.get('species')
        if shelter_id:
            qs = qs.filter(shelter_id=shelter_id)
        if species:
            qs = qs.filter(species=species)
        return qs

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class TeamMemberViewSet(viewsets.ModelViewSet):
    """ViewSet для команды проекта"""
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]


class ServiceViewSet(viewsets.ModelViewSet):
    """ViewSet для шагов «Как это работает»"""
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet для обратной связи.
    POST /api/contact/ — отправить сообщение (привязка к request.user)
    GET /api/contact/ — список (для авторизованных)
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        """Привязываем сообщение к авторизованному пользователю"""
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'status': 'success', 'message': 'Сообщение отправлено!'},
            status=status.HTTP_201_CREATED
        )


class FavoriteViewSet(viewsets.ModelViewSet):
    """ViewSet для избранных питомцев текущего пользователя"""
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user).select_related('pet', 'pet__shelter')

    def perform_create(self, serializer):
        """Привязываем избранное к request.user"""
        serializer.save(user=self.request.user)
