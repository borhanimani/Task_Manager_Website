from django.urls import path
from .views import LoginAPIView, LogoutAPIView, CurrentUserAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='api_login'),
    path('logout/', LogoutAPIView.as_view(), name='api_logout'),
    path('user', CurrentUserAPIView.as_view(), name='api_get_user')
]