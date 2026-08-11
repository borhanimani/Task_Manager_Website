from django.urls import path
from .views import TaskListAPIView

urlpatterns = [
    path('', TaskListAPIView.as_view(), name='api_task_list'),
]