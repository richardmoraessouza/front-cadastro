from django.urls import path
from . import views
from .views import UsuarioListCreate
urlpatterns = [
    path('', views.index, name='index'),
    path('api/usuarios/', UsuarioListCreate.as_view(), name='usuarios_api'),
    path('api/usuarios/<int:pk>/', UsuarioListCreate.as_view(), name='usuario_detail'),
]


