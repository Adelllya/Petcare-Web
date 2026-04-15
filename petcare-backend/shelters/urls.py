from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    ShelterViewSet, PetViewSet, TeamMemberViewSet,
    ServiceViewSet, ContactMessageViewSet, FavoriteViewSet,
    LoginView, RegisterView,
    api_stats, toggle_favorite
)

router = DefaultRouter()
router.register(r'shelters', ShelterViewSet, basename='shelter')
router.register(r'pets', PetViewSet, basename='pet')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = [
    # Router URLs (ViewSets)
    path('', include(router.urls)),

    # Auth endpoints (CBV — APIView)
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),

    # FBV endpoints
    path('stats/', api_stats, name='api-stats'),
    path('pets/<int:pet_id>/favorite/', toggle_favorite, name='toggle-favorite'),
]
