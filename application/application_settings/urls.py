"""
URL configuration for application_settings project.
"""
from django.contrib import admin
from django.urls import path, re_path, include

from main_application.views import page_not_found

urlpatterns = [
    re_path(r'^admin/?', admin.site.urls),
    path('', include('main_application.urls')),
]

handler404 = page_not_found
