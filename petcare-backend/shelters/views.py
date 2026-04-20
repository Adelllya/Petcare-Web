from rest_framework import viewsets
from .models import Shelter
from .serializers import ShelterSerializer

class ShelterViewSet(viewsets.ModelViewSet):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer