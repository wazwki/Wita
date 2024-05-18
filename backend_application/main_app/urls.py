""" Configurate url's for main application """

from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index),
]
