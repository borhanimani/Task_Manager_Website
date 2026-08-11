from django.urls import path
from .views import TaskView, TaskCreateView, TaskDetailView, TaskEditView, TaskDeleteView

urlpatterns = [
    path('', TaskView.as_view(), name='task_list'),
    path('add/', TaskCreateView.as_view(), name='task_create'),
    path('detail/<int:pk>/', TaskDetailView.as_view(), name='task_detail'),
    path('edit/<int:pk>/', TaskEditView.as_view(), name='task_edit'),
    path('delete/<int:pk>/', TaskDeleteView.as_view(), name='task_delete'),
]