from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .api_views import TaskViewSet

router = DefaultRouter()
router.register(r'api/tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', views.task_list, name='task_list'),
    path('<int:task_id>/', views.task_detail, name='task_detail'),
    path('new/', views.task_create, name='task_create'),
    path('<int:task_id>/edit/', views.task_update, name='task_update'),
    path('<int:task_id>/delete/', views.task_delete, name='task_delete'),
    path('', include(router.urls)),
]
