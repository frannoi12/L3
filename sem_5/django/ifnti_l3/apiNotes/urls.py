from rest_framework.routers import DefaultRouter
from django.urls import path, include
# from .views import EnseignantViewSet
from .views import liste_enseignant


# router = DefaultRouter()
# router.register('api_notes', EnseignantViewSet)

# app_name = "apiNotes"


urlpatterns = [
    path('apiGet/', liste_enseignant, name='apiget'),
    # path('', include(router.urls)),
]
